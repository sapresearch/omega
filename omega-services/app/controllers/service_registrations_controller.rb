class ServiceRegistrationsController < Omega::Controller

  require "service_lib.rb"
  include ServiceLib

  respond_to :html, :js, :xml, :json

  def index
    @service_id = params[:service_id]
    @service = Service.find(@service_id)
    @service_registrations = @service.service_registrations
  end
  
  def create
    @registrant = params[:registrant_id] ? Contact.find(params[:registrant_id]) : current_contact
    
    @service = Service.find(params[:service_id])     
    @service_leaf_id = @service.service_leaf.id

    ServiceRegistration.transaction do
      if ServiceRegistration.find_by_registrant_id_and_service_leaf_id(@registrant.id, @service_leaf_id).nil?
        @status = params[:status]
        @field_values = params[:field_values]

        @service_registration = ServiceRegistration.create(:service_leaf_id=>@service_leaf_id, :status=>@status, :registrant_id=>@registrant.id)
        @service_registration.create_service_registration_form_value(:field_values => @field_values) unless @field_values.nil?
      end
    end

    # for js
    # not redirect to services#index for better performance
    @super_service = @service.super_service
    @services = @service.sibling_services

    @services = my_services(@services) if session[:my_services_switch]=="on"
    respond_with(@service_registration)
  end

  def update
    @service_registration = ServiceRegistration.find(params[:id])
    
    @status=params[:status]
    @service_registration.update_attribute(:status,@status) if @status

    @field_values=params[:field_values]
    @service_registration.service_registration_form_value.update_attribute(:field_values,@field_values) if @field_values

    @sorted_column = params[:sorted_column]
    @sorting_method = params[:sorting_method]

    #for js
    @service = @service_registration.service
    @service_registrations = @service.service_registrations
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

