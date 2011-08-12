class ServiceRegistrationsController < Omega::Controller

  require "service_lib.rb"
  include ServiceLib

  respond_to :html, :js, :xml, :json
  
  # use this if using ajax for new registration form.
  def new
    #@service = Service.find(params[:service_id])
    #@service_registration = @service.service_registrations.build
  end

  def create
    @contact = params[:contact_id] ? Contact.find(params[:contact_id]) : current_contact
    
    @service = Service.find(params[:service_id])     
    @service_leaf_id = @service.service_leaf.id
    @status = params[:status] 
    @field_values = params[:field_values]
    
    @service_registration = ServiceRegistration.create(:service_leaf_id=>@service_leaf_id, :status=>@status, :contact_id=>@contact.id)
    @service_registration.create_service_registration_form_value(:field_values => @field_values) unless @field_values.nil?

    # for js
    # not redirect to services#index for better performance
    @super_service = @service.super_service
    @services = @service.sibling_services

    @services = my_services(@services) if session[:my_services_switch]=="on"
    respond_with(@service_registration)
  end

  def destroy
    @service_registration = ServiceRegistration.find(params[:id])
    @service = @service_registration.service
    @service_registration.destroy

    # for js
    # not redirect to services#index for better performance
    @super_service = @service.super_service
    @services = @service.sibling_services

    @services = my_services(@services) if session[:my_services_switch]=="on"
    respond_with(@service_registration)
  end
end

