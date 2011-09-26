class SearchFilter < Array

def test
require 'filter.rb'

s = Hash.new
s[:column] = "last_name"
s[:query] = "Smith"

se = Hash.new
se[:column] = s

params = Hash.new
params[:search] = se
f = SearchFilter.filter_for(Contact, params)
end

	attr_accessor :column_types
	def initialize(model)
		@column_types = Hash.new
		model.columns.each { |c| @column_types[c.name.to_sym] = c.type.to_s }
	end

	def self.filter_for(model, params)
		all = model.send :find, :all
		columns = model.send :columns
		columns = columns.inject(Array.new) { |columns_array, column| columns_array.push(column.name) }
		@search_filter = all.inject(SearchFilter.new(model)) do |filter, row|
			row_hash = Hash.new
			columns.each { |column| row_hash[(column.to_sym).to_sym] = row[column.to_sym] }
			filter.push(row_hash)
		end

		if params[:search].nil?
			@search_filter
		elsif !params[:search].nil?
			params[:search].each do |key, values|
				column = values[:column].to_s
				query = values[:query].to_s
				operator = @search_filter.operator_for(column)
				@search_filter.keep_only(operator, query, column)
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
		column_names = self.first.collect { |column, value| column }
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

	def keep_only(operator, query, column)
		type = query.class.to_s
		operator = :==
		case type
			when "String"
				operator = :include?
			else
				operator = :>=
		end
		column = column.to_sym
		self.each do |row|
			valid = false
			valid = row[column].send(operator, query) if !row[column].nil?
			self.delete(row) if valid = false
		end
	end

	def operator_for(column)
		column = column.to_sym
		puts column.to_s
		puts @column_types.inspect.to_s
		type = @column_types[column.to_sym].to_s
		type = type.downcase
		case type
			when "string" || "text"
				return "include?"
			when "integer"
				return ">="
			else
				return "unknown"
		end
	end

end
