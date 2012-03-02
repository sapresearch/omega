class SearchFilter < Array

	def test
		require 'filter.rb'

		params = Hash.new
		#params[:search] = { :column => { :column => "skills,skills,interests", :query => "Embroidery,cooking,else" }}
		params[:search] = { :column => { :column => "addresses", :query => "26506" }}

		options = [ {:class => :skills, :column => :name, :type => :string}, { :class => :interests, :column => :name, :type => :string }, { :class => :addresses, :column => :zip_code, :type => :integer } ]
		Contact::Field.all.each do |cf|
			type = cf.data_type.to_sym unless cf.data_type.nil?
			options << { :class => :self, :column => cf.name.to_sym, :type => type }
		end
		@filter = SearchFilter.filter_for(Contact, params, options)
	end

	attr_accessor :column_types
	def initialize(model, options={})
		@column_types = Hash.new
		model.columns.each { |c| @column_types[c.name.to_sym] = c.type.to_s }
		if !options.nil?
			options.each { |h| @column_types[h[:class].to_sym] = h[:type].to_s }
		end
	end

	def self.filter_for(model, params, options={})
			all = model.send :find, :all
			columns = model.send :columns
			columns = columns.inject(Array.new) { |columns_array, column| columns_array.push(column.name) }
			@search_filter = all.inject(SearchFilter.new(model, options)) do |filter, row|
				row_hash = Hash.new
				columns.each { |column| row_hash[(column.to_sym).to_sym] = row[column.to_sym] }
				filter.push(row_hash)
			end

		# Options.
		if !options.nil?
			options.each do |h|
				included_model = h[:class]
				col = h[:column]
				@search_filter.each do |row|
					if included_model == :self
						value = model.find(row[:id]).send col
						row[col] = value
					else
						other_model = model.find(row[:id]).send included_model.to_sym
						values = other_model.each.collect { |x| x.send col.to_sym }
						row[included_model.to_sym] = values.join(",")
					end
				end
			end
		end
			

		if params[:search].nil?
			@search_filter
		elsif !params[:search].nil?
			params[:search].each do |key, values|
				columns = values[:column].to_s.split(',')
				columns.uniq!
				queries = values[:query].to_s.split(',')
				search = Hash.new
				columns.count.times do |x|
					search[queries.at(x).to_sym] = columns.at(x)
				end
				
				columns.each do |col|
					operator = @search_filter.operator_for(col)
					puts "\nThis is operator: " + operator.to_s
					needles = Array.new
					search.each do |q, c|
						if col == c 
							#q = q.send(operator == :include? ? :to_s : :to_i) # Depracated for now. When you use more sets with strings and integers use this.
							needles.push(q.to_s)
						end
					end
					puts "\nThis is needles: " + needles.inspect.to_s
					@search_filter.keep_only(operator, needles, col) unless operator == 'distance' # Because this is a zip.
					if operator == 'distance'
						@search_filter.keep_only_zip(needles)
					end
				end
			end
		end
		@search_filter
	end

	# Creates an accessor method for specific columns. It returns the values for that column and also accepts an optional block.
	def method_missing(name, *args, &block)
		found = false
		return_values = Array.new
		column_name = String.new
		self.each_column do |c_name, c_values|
			if c_name == name
				found = true
				column_name = c_name
				return_values = c_values
			end
		end
		if found == true
 			if block.nil?
				return return_values
 			elsif !block.nil?
				return yield(column_name, return_values)
			end
		elsif found == false
			super
		end
	end

	def each_column
		column_names = self.at(0).collect { |k, v| k.to_sym } #@column_types.collect { |column, type| column }
		column_names.each do |name|
			column_data = self.inject(Array.new) { |column, row| column.push(row[name]) }
			yield(name, column_data)
		end
	end

	def checkbox_options_for(column_values, options={})

		if options[:group].nil? then
			class_type = options[:type].nil? ? "unknown" : options[:type].to_s.downcase
			class_group = "unknown"
			case class_type
				when "falseclass" || "trueclass" || "boolean"
					class_group = "boolean"
				when "activesupport::timewithzone" || "datetime"
					class_group = "datetime"
				when "fixnum" || "integer"
					class_group = "integer" 
				when "string"
					if column_values.count > 3
						class_group = column_values.uniq.count <= 3 ? "nominal" : "free_text"
					else
						# Assume it's free text if there are very few options.
	 					class_group = "free_text"
					end
			end
		elsif !options[:group].nil? then
			class_group = options[:group].to_s.downcase
		end

		checkbox_options = Array.new
		column_values = column_values.compact
		if column_values.count > 1
			case class_group
				when "free_text"
					column_values.uniq.each { |v| checkbox_options.push(v) }
				when "nominal"
					column_values.uniq.each { |v| checkbox_options.push(v) }
				when "boolean"
					checkbox_options.push(true, false)
				when "integer" || "datetime"
					if !column_values.empty?
						numbers = column_values.select { |x| !x.nil? }
						sum = numbers.inject { |sum, v| sum += v }
						avg = sum/numbers.count
						numbers.sort! { |a,b| a <=> b }
						range = numbers.last - numbers.first
						# This doesn't let the range of each selection choice become trivially small.
						num_of_selections = (1..5).inject do |num_of_selections, x|
							range_per_selection = range/x 
							num_of_selections = range_per_selection >= 2 ? x : num_of_selections
						end
						# Don't let the selections become larger than the number of elements.
						num_of_selections = num_of_selections > numbers.count ? numbers.count : num_of_selections
						num_of_selections.times do |n|
							checkbox_options.push(numbers.first + n * range/num_of_selections)
						end
					end
			end
		end
		checkbox_options = checkbox_options.delete_if { |x| x == "" }
		#debug = "Class group: " + class_group.to_s + ". Checkbox options: " + checkbox_options.inspect.to_s + ". Options received by filter.rb: " + options.inspect.to_s
	end

	def keep_only(operator, queries, column)
		column = column.to_sym
		puts "\nIn keep_only method"
		self.reject! do |r|
			if r[column].nil?
				true
			elsif !r[column].nil?
				!recursive_or(r[column], operator, queries)
			end
		end
	end

	def keep_only_zip(zip_query)
		zip_query = zip_query.at(0) if zip_query.is_a?(Array)
		puts "\nIn only zip method"
		self.reject! do |r|
			if r[:addresses].nil? or r[:addresses] == ""
				puts "addresses is nil"
				true
			elsif !r[:addresses].nil? and r[:addresses] != ""
				puts "\n This should NOT be nil: " + r[:addresses].inspect.to_s
				puts "\n Distance: " + Zipp.distance(r[:addresses], zip_query).to_s
				Zipp.distance(r[:addresses], zip_query) < 100 ? false : true
			end
		end
	end
		
	def recursive_or(haystack, operator, needles)
		result = false 
		needles.each do |needle|
			result = result == true ? true : haystack.send(operator, needle)
			puts result.to_s + " is the result for " + haystack.to_s + " " + operator.to_s + " " + needle.to_s
		end
		result
	end

	def operator_for(column)
		column = column.to_sym
		type = @column_types[column.to_sym].to_s.downcase
		type = "addresses" if column.to_s == "addresses"
		puts "\n\nThis is the column: " + column.to_s
		if type.blank?
			custom_field = Contact::Field.find_by_name(column)
			type = custom_field.nil? ? 'unknown' : custom_field.data_type
		end
		puts "\n This is type: " + type.to_s + "\n"
		case type
			when "string", "text", "boolean"
				return "include?"
			when "integer"
				return ">="
			when "addresses"
				return "distance"
			else
				return "unknown"
		end
	end

end

class Zipp
	require 'zipcodr'
	require 'faster_haversine'

	def self.distance(zip, query)
		puts "Zip: " + zip.to_s
		puts "query: " + query.to_s
		lat1 = Zipcodr::find(zip).lat
		long1 = Zipcodr::find(zip).long
		lat2 = Zipcodr::find(query).lat
		long2 = Zipcodr::find(query).long
		FasterHaversine.distance(lat1, long1, lat2, long2)
	end
end
