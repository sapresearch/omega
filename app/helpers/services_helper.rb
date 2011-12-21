module ServicesHelper

  require_dependency "application_lib.rb"
  include ApplicationLib
  require_dependency "service_lib.rb"
  include ServiceLib

  def service_bread_crumb(service)
    while not service.nil?
      html = " > ".html_safe + (link_to service.name, services_url(:super_service_id=>service.id), :remote=>true) + html
      service = service.super_service
    end
    html = (link_to "All services", services_url(:super_service_id=>Service::ROOT_SUPER_SERVICE_ID), :remote=>true) + html;
    html = "<div class='bread_crumb'>".html_safe + "Location: " + html
    html += "</div>".html_safe
  end    
  
end

