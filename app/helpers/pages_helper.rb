	module PagesHelper
	  def current_page_path
	    current = url_for(params)
	    current.gsub!(/\A\//, '')
	    current = 'home' if current.empty?
	
	    page_path(current)
	  end
	end
