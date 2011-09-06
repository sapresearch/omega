module SearchHelper

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
