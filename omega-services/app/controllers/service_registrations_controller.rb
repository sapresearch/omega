class ServiceRegistrationsController < Omega::Controller

  # use this if using ajax for new registration form.
  def new
    #@service = Service.find(params[:service_id])
    #@service_registration = @service.service_registrations.build
  end

  def create
    # app-spec
    @contact = Contact.for(current_user)   
    # end app-spec
    
    @service = Service.find(params[:service_id])     
    @service_leaf_id = @service.service_leaf.id
    @status = params[:status] 
    @field_values = params[:field_values]
    
    @service_registration = ServiceRegistration.create(:service_leaf_id=>@service_leaf_id, :status=>@status, :contact_id=>@contact.id)
    @service_registration.create_service_registration_form_value(:field_values => @field_values) unless @field_values.nil?

    session[:super_service_id] = @service.super_service.id unless @service.is_root?
    redirect_to services_url
  end
end

