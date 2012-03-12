	module MyPageHelper
	
		def tag_table_for(array, &block)
			html = ""
			j = 0
			array.each do |a|
				html << yield(a)
				j += 1
				if j == 3
					html << "</tr><tr>"
					j = 0
				end
			end
			("<table><tr>" << html << "</tr></table>").html_safe
		end
	
	end
