module ServiceLib
  def current_contact
    # app-spec
    Contact.for(current_user)
    # end app-spec
  end
  
  def my_services(services)
    ServiceRegistration.filter_services_by_registrant(services,current_contact)
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
end