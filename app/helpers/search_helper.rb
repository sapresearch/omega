	require 'filter.rb'
	module SearchHelper
	
		def accordion_for(name, column_data)
			list = ActiveSupport::SafeBuffer.new
			category_name = name.to_s
			column_data.each do |inner_html|
				list << "<li name='#{category_name}' > #{inner_html} </li>".html_safe
			end
			list
		end
	
		def list_all(matrix, values)
			matrix.each do |row|
				if values[:display].instance_of?(Array)
					display = values[:display].inject(String.new) { |display, c| display << (row[c.to_sym].to_s + " ") }
				else
					display = row[values[:display]].to_s + " "
				end
				hidden = row[values[:hidden]]
				yield(display, hidden)
			end
		end
	
	
	
	
		def filter_form_for(filter)
			filters = "<form id='test'>".html_safe
			filter = Array.new
			filter.first.each_key { |k| columns.push(k) }
			columns.each do |c|
				class_type = filter.inject(String.new) { |type, row| type = row[c].class.to_s.downcase unless row[c].nil? }
				class_type = "nilclass" if class_type.nil?
				column_values = filter.inject(Array.new) { |column_values, row| column_values.push(row[c.to_sym]) }
	
				if column_values.compact.count > 1 then
					input = filter.checkbox_options_for(class_type, column_values)
					#puts "this is input: " + input.inspect + "\n\n"
					if input.empty?
						return ""
					elsif !input.empty?
							#puts "\n\n" + c.to_s + " is type: " + class_type
							#puts "Checkbox options: " + input.inspect 
							c = c.to_s
							label = "<label for='" + c + "' style='width:50px' >" + c + "<\/label>"
							options = ""
							options = input.inject(String.new) { |options, o| options += "<input type='checkbox' name='#{c}' value='#{o}' onclick='filter('#{c}');' checked='checked' /> #{o} " }
							options += "</ br>"
							filters += (label + options).html_safe
					end
				end
	
			end
			#puts "\n\n This is filter: " + filters.inspect + "\n"
			filters += "</form>".html_safe
		end
	
		def checkbox_filter_for(filter, options={})
			column = options[:column]
			column_values = filter.send column.to_sym
			name = options[:name].nil? ? options[:column].to_s : options[:name].to_s
	
			################## Testing ######################
			puts "\n\n Column values sent from helper to filter.rb " + column_values.inspect
			switches = Hash.new
			options.each { |k, v| switches[k] = v }
			puts "\n switches: " + switches.inspect.to_s
			f = filter.checkbox_options_for(column_values, switches)
	    puts "\n\nCheckbox options. Sent from filter.rb to search_helper.rb " + f.inspect.to_s
			puts f.to_s
			################## Testing ######################
	
			# Format the HTML.
			html = String.new
			label = '<label for="' + column.to_s + '>' + name + '</label>'
			filter.checkbox_options_for(column_values, switches).each do |option|
				check_label = '<label for="' + column.to_s + '>' + option + '</label>'
				check = '<input id="search[' + column.to_s + '][' + option + ']" type="checkbox" onclick="filter("' + column.to_s + '");" checked="checked" />'
				html += ('<li>' + check_label + check + '</li>')
			end
			html = (label + '<ul>' + html + '</ul>').html_safe
		end
	
	
	
	
	
	
		def get_frequency_hash(array)
			all_terms = array.collect { |e| e.name }
			unique_terms = all_terms.uniq
			frequency_hash = Hash.new
			unique_terms.each do |term|
				term_count = all_terms.count { |x| x == term }
				frequency_hash[term] = term_count
			end
			frequency_hash
		end
	
		def frequency_hash_to_full_hash(skills_or_interests, frequency_hash)
			all_terms = Hash.new
			frequency_hash.each do |term, count|
				term_to_contacts = Hash.new
				skills_for_one_term = skills_or_interests.select { |e| e.name == term }
				skills_for_one_term.each do |skill|
					contacts_for_term = Hash.new
					if skill.contacts.count > 0 then
						skill.contacts.each_with_index do |contact, index|
							c = Hash.new
							c[:name] = "#{contact.first_name} #{contact.last_name}"
							c[:id] = contact.id
							contacts_for_term[index] = c
						end
						term_to_contacts[:contacts] = contacts_for_term
						term_to_contacts[:term_frequency] = count
						all_terms[term] = term_to_contacts
					end
				end
			end
			all_terms
		end
	
	
	####################################################
		def test_matrix
			params = Hash.new
			s = SearchHelper::Stuff.new
			search_matrix = SearchFilter.search_matrix_for(Contact, params)
			s.filter_form_for(search_matrix) { |v| v.checkbox_filter }
		end
	
		def test_by_column
			a = Hash.new
			b = Hash.new
			c = Hash.new
			a[:first_name] = "Joe"
			b[:first_name] = "Greg"
			c[:first_name] = "Michelle"
			a[:last_name] = "Miller"
			b[:last_name] = "Brown"
			c[:last_name] = "Sanders"
			matrix = [a, b, c]
			by_column(matrix) { |c| p "<div>".html_safe + c + "</div>".html_safe }
		end
	####################################################
	
	
	
	
	
		def test_list_contacts_in(array, position_id, category_name)
			frequency = frequency_hash_to_full_hash(array, get_frequency_hash(array))
			unordered_list = ActiveSupport::SafeBuffer.new
			frequency.each_key do |term|
				contacts_data = String.new
				frequency[term][:contacts].each do |key, contact|
	 				contacts_data = contacts_data + frequency[term][:contacts][key][:name].to_s +
												"," +
												contact[:id].to_s +
												",,"
				end
				inner_html = term.to_s + " " #+
										 #"#{frequency[term][:term_frequency].inspect}" +
										 #" volunteer(s)"
				javascript_function_args = contacts_data + "," + position_id.to_s
				unordered_list << html_list_item_element(inner_html, javascript_function_args, category_name)
			end
			unordered_list
		end
	
		def html_list_item_element(inner_html, javascript_function_args, category_name)
			content_tag(:li, content_tag(:a, inner_html, :name => category_name, :href => "#", :onclick => "display_search_results('#{javascript_function_args}')"))
		end
	
		def html_unordered_list_element(list_items)
			content_tag(:ul, list_items, :style => "margin-left:50px")
		end
	
		def list_contacts_in(array, position_id)
			frequency_hash = TagCloud.frequency_hash(array)
			frequency_hash = frequency_hash.sort { |a,b| a[0] <=> b[0] }
			list_items = ActiveSupport::SafeBuffer.new
			frequency_hash.each do |tag, occurs|
				occurs > 1 ? volunteer = "volunteers" : volunteer = "volunteer"
	
				name_word_hash = TagCloud.name_word_hash(array)
				v = ""
				name_word_hash[tag].each { |volunteer_name| v << "#{volunteer_name.first_name},#{volunteer_name.id},," }
				tag = tag.capitalize
				td = ActiveSupport::SafeBuffer.new
				list_items << content_tag(:li, content_tag(:a, "#{tag}(#{occurs} #{volunteer})", :href => "#", :onclick => "generate_element('#{v}', '#{tag}', '#{position_id}')"))
	 			#td << content_tag(:td, "(#{occurs} #{volunteer})")
				#list_items << content_tag(:tr, content_tag(:td, content_tag(:a, "#{tag}", :href => "#", :onclick => "generate_element('#{v}', '#{tag}', '#{position_id}')")), content_tag(:td, "(#{occurs} #{volunteer})"))
			end
			content_tag(:ul, list_items, :style => "margin-left:50px")
		end
	
		def names_and_ids_for_word(word)
			names_and_ids = ""
			@contact_term_hash.each do |contact_id, contact|
				s_and_i = contact["skills"] << contact["interests"]
				unless nil == (s_and_i.split(",").collect { |term| term == word }) then # Does the contact have the skill or interest?
					names_and_ids << "#{contact["first_name"]} #{contact["last_name"]}, #{contact_id},,"
				end
			end
			names_and_ids
		end
	
		def list_names(array)
			#html = content_tag(:div, :id => "tag-cloud", content_tag(:ul) ) 
			dist_array = TagCloud.placement_array(array)
			list_items = ActiveSupport::SafeBuffer.new
			#color_array = %w( blue red green orange purple yellow )
			color_array = Array.[]("#4E387E", "#357EC7", "#800517", "#347C17", "#C35617" )
			i = 0
			j = 0
			k = 0
			array.each do |e|
				#top = i * 15
				#left = k * 25
				left = dist_array.at(i)
				top = dist_array.at(k) + rand(10)
				color = color_array.at(rand(5))
				list_items << content_tag(:li, e.name, :id => "tag-cloud", :style => "top:#{top}; left:#{left}%; color:#{color}; font-size:150%")   #, :style => "top:#{top}; right:#{right}") }
				i += 1
				j += 1
				k += 1 if j == dist_array.count - 1
				i = 1 if i == dist_array.count - 1
			end
			unordered_list = content_tag(:ul, list_items, :id => "tag-cloud" ) #ActiveSupport::SafeBuffer.new
		end
	
	
	
		class TagCloud
	
		def self.name_word_hash(array)
			word_names_hash = Hash.new
			array.each do |e|
				contact_names = Array.new
				if e.contacts.count > 0 then
					e.contacts.each do |contact|
						contact_names.push(contact)
						#contact_names.push("#{contact.first_name} #{contact.last_name}")
					end
				end
				word_names_hash[e.name] = contact_names
			end
			word_names_hash
		end
	
			def self.word_names_hash()
				words = Array.new
				TagCloud.frequency_hash(Contact::Skill.all).each {|k, v| words.push(k) }
				word_user_hash = Hash.new
				words.uniq!
				words.each { |word| word_user_hash[word] = Array.new }
		
				Contact::Skill.all.each do |skill|
					skill.contacts.each do |contact|
						word_user_hash[skill.name] = Array[contact.user] unless contact.user.nil?
					end
				end
				word_user_hash = word_user_hash.keep_if { |word, user_array| !user_array.empty? }
			end
		
			def self.placement_array(array)
				names_array = array.collect { |e| e.name }
				max_distance = 90
				dist_array = Array.new
				number_of_words = names_array.count
				blocks_per_dimension = (Math.sqrt(number_of_words)).floor
				dist_per_block = max_distance/blocks_per_dimension
				i = 0
				blocks_per_dimension.times do
					dist_array.push(i * dist_per_block)
					i += 1
				end
		
				remainder = number_of_words - blocks_per_dimension**blocks_per_dimension
				i = 1
				remainder.times do
					dist_array.push((i * dist_per_block) - dist_per_block/2 )
					i += 1
				end
				dist_array
			end
		
			def self.frequency_hash(array)
				names = array.collect { |e| e.name }
				frequency = Hash.new
				names.each do |name|
					if frequency.has_key?(name) then
						frequency[name] += 1
					else
						frequency[name] = 1
					end
				end
				frequency
			end
		
			def self.frequency_avg_for(frequency_hash)
				total_values = 0
				key_count = 0
				frequency_hash.each do |k, v|
					total_values = total_values + v
					key_count += 1
				end
				avg = total_values/key_count
			end
		
			def self.standard_deviation_for(frequency_hash, avg)
				sum_difference_squared = 0
				key_count = 0
				frequency_hash.each do |k, v|
					sum_difference_squared += (v - avg)**2
					key_count += 1
				end
				sum_difference = Math.sqrt(sum_difference_squared)
				standard_deviation = sum_difference/key_count
			end
					
			def self.standard_deviation_hash(frequency_hash, avg, standard_deviation)
				sd_hash = Hash.new
				frequency_hash.each do |k, v|
					difference_from_avg = v - avg # Don't square and square root this, so that you get a negative value for values below the average.
					unless difference_from_avg == 0
						sd_hash[k] = difference_from_avg/standard_deviation # The SD for this word
					else
						sd_hash[k] = 0
					end
				end
				sd_hash
			end
		
			def self.style_font_size(standard_deviation)
				return "large" if standard_deviation > 0
				return "medium" if standard_deviation == 0
				return "small" if standard_deviation < 0
			end
		
			def tag_cloud_style(array)
				frequency_hash = TagCloud.frequency_hash(array)
				puts "this is freq hash:"
				puts frequency_hash
		
				frequency_avg = TagCloud.frequency_avg_for(frequency_hash)
				puts "this is freq avg:"
				puts frequency_avg
		
				sd = TagCloud.standard_deviation_for(frequency_hash, frequency_avg)
				puts "this is sd:"
				puts sd
		
				sd_hash = TagCloud.standard_deviation_hash(frequency_hash, frequency_avg, sd)
				puts "this is sd_hash:"
				puts sd_hash
		
				style = Array.new
				sd_hash.each do |word, sd|
					puts TagCloud.style_font_size(sd)
					style.push("#{TagCloud.style_font_size(sd)}")
					#content_tag(:p, word, :style => style) # "#{word}", :style => style)
				end
				style
			end
		end
		
	end
