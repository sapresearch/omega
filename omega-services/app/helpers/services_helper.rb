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
    html = (link_to "All services", services_url(:super_service_id=>"root"), :remote=>true) + html;
    html = "<div class='bread_crumb'>".html_safe + "Location: " + html
    html += "</div>".html_safe
  end

  def registered?(service)
    return false unless service.is_leaf?
    return false if service.service_registrations.empty?
    # app-spec
    return false if current_user.is_anonymous?
#testing
    #service_registration = ServiceRegistration.find_by_service_leaf_id_and_contact_id(service.service_leaf.id, Contact.for(current_user).id)
    # end app-spec
    #not service_registration.nil?
    false
  end
  
end

