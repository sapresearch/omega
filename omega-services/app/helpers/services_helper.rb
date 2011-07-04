module ServicesHelper

  #testing
  def is_admin?(user)
    true
  end

  def bread_crumb(service)
    while not service.nil?
      html = " > ".html_safe + (link_to service.name, services_url(:super_service_id=>service.id), :remote=>true) + html
      service = service.super_service
    end
    html = (link_to "All services", services_url(:super_service_id=>"root")) + html;
    html = "<div class='bread_crumb'>".html_safe + html
    html += "</div>".html_safe
  end

end

