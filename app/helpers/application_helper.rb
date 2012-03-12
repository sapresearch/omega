  module ApplicationHelper
	  def sub_layout
	    controller.sub_layout
	  end
	
	  def flash_session_meta_tag
	    session_key    = Rails.application.config.session_options[:key]
	    session_cookie = cookies[session_key]
	
	    %(<meta name="flash-session-key" content="#{session_key}"/>\n<meta name="flash-session-cookie" content="#{session_cookie}"/>).html_safe
	  end
	  
	   def title(page_title)
	  	content_for(:title) {
	  		page_title
	  	}
	  end
	  
  end
