module Omega
	module OmegaHelper
	include ActionView::Helpers::UrlHelper

		def tenant_link_to(*args)
			name = args[0]
			path = args[1]
			url = tenant_url_for(path)
			"<a href='#{url}' > #{name} </a>".html_safe
		end

		def tenant_url_for(path)
			url = url_for(path)
			url = url.gsub('//', '/')
		end

		#alias :old_url_for :url_for 
		#def url_for(options)
			#options.inspect.to_s
		#end

	end
end
