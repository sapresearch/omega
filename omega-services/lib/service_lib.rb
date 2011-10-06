module ServiceLib
  def current_contact
    # app-spec
    Contact.for(current_user)
    # end app-spec
  end
  
  def my_services(services)
    ServiceRegistration.filter_services_by_registrant(services,current_contact)
  end

  def include_enrollable(base_services, reference_services)
    (base_services + Service.filter_by_register_type(reference_services, "enrollable")).uniq{|s|s.id}
  end

  def include_requestable(base_services, reference_services)
    (base_services + Service.filter_by_register_type(reference_services, "requestable")).uniq{|s|s.id}
  end

  def registered?(service, user=current_user)
    return false unless service.is_leaf?
    return false if service.service_registrations.empty?
    # app-spec
    return false if user.is_anonymous?
    service_registration = ServiceRegistration.find_by_service_leaf_id_and_registrant_id(service.service_leaf.id, Contact.for(user).id)
    # end app-spec
    not service_registration.nil?
  end

  def services_to_search
    services = is_admin? ? Service.all : Service.real_public_services
    services.sort!{|s1,s2|s1.name<=>s2.name}
    services.map{|s|{:label=>s.name, :value=>s.name, :id=>s.id}}
  end

  def filter_services(services=@services)
    filtered_services = []
    filtered_services = include_enrollable(filtered_services, services) if session[:enrollable_switch]=="on"
    filtered_services = include_requestable(filtered_services, services) if session[:requestable_switch]=="on"    
    filtered_services = my_services(filtered_services) if session[:my_services_switch]=="on"
    @services = filtered_services
  end

  def reset_filter_sessions
    session[:my_services_switch]="off"
    session[:enrollable_switch]="on"
    session[:requestable_switch]="on"
  end

  private

  def services_exception_handler
    begin
      yield
    rescue
      redirect_to services_url
    end
  end
  
end