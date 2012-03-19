	module PagesHelper
	  def tenant_current_page_path
	    current = url_for(params)
	    current.gsub!(/\A\//, '')
	    current = 'home' if current.empty?
	
	    tenant_page_path(current)
	  end
	end
