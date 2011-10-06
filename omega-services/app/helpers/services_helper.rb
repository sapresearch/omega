module ServicesHelper

  require "service_lib.rb"
  include ServiceLib

  def is_admin?(user=current_user)
    # app-spec
    user.has_permission?(Service::PERM_ADMIN)
    # end app-spec
  end

  def bread_crumb(service)
    while not service.nil?
      html = " > ".html_safe + (link_to service.name, services_url(:super_service_id=>service.id), :remote=>true) + html
      service = service.super_service
    end
    html = (link_to "All services", services_url(:super_service_id=>Service::ROOT_SUPER_SERVICE_ID), :remote=>true) + html;
    html = "<div class='bread_crumb'>".html_safe + "Location: " + html
    html += "</div>".html_safe
  end    

  def nl2br(string)
    string.gsub("\n", "<br>").html_safe
  end

  def blank_sign(text="(blank)")
    content_tag("span", text, :class=>"blank_sign")
  end
  
end

