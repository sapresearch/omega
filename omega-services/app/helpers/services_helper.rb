module ServicesHelper

  def is_admin?(user=current_user)
    user.has_permission?(Service::PERM_ADMIN)
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

  def registered?(service, user=current_user)
    return false unless service.is_leaf?
    return false if service.service_registrations.empty?
    # app-spec
    return false if user.is_anonymous?
    service_registration = ServiceRegistration.find_by_service_leaf_id_and_contact_id(service.service_leaf.id, Contact.for(user).id)
    # end app-spec
    not service_registration.nil?
  end

  def services_to_search
    services = is_admin? ? Service.all : Service.real_public_services
    services.sort!{|s1,s2|s1.name<=>s2.name}
    services.map{|s|{:label=>s.name, :value=>s.name, :id=>s.id}}
  end

  def nl2br(string)
    string.gsub("\n", "<br>").html_safe
  end
  
end

