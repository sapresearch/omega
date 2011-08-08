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
  
	def image_in_use_url(banner_or_logo)
		image = Image.all.select{ |i| i.image_in_use and i.banner_or_logo == banner_or_logo }.at(0)
		url = image.image.url if image.respond_to? 'image'
		if url.nil? and banner_or_logo == "Banner" then
			return "../images/top-banner-right.png"
		elsif url.nil? and banner_or_logo == "Logo" then
			return "../images/application/logo.png"
		else
			return url
		end
	end

	def banner_in_use
		url = image_in_use_url("Banner")
		return "<div id=\"logo\" style=\"background:url(" + url + ") no-repeat left scroll transparent\" ><\/div>"
	end

	def logo_in_use
		url = image_in_use_url("Logo")
		"<div id=\"logo\" style=\"background:url(" + url + ") no-repeat left scroll transparent\" ></div>"
	end
end
