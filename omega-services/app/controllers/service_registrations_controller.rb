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
    @from_page = params[:from_page]
    if @from_page == "services#index"
      @super_service = @service.super_service
      @services = @service.sibling_services
      @services = my_services(@services) if session[:my_services_switch]=="on"      
    elsif @from_page == "service_registrations#index"
      @service_registrations = @service.service_registrations
    end
    
    respond_with(@service_registration)
  end

  def update
    @service_registration = ServiceRegistration.find(params[:id])
    @service = @service_registration.service

    @status_update_success = true
    @status=params[:status]
    if @status
      if @status=="accepted" && @service_registration.status!="accepted" && @service.accepted_registrants.count >= @service.capacity
        @status_update_success = false
      else
        @service_registration.update_attribute(:status,@status)
      end
    end
    
    @field_values=params[:field_values]
    @service_registration.service_registration_form_value.update_attribute(:field_values,@field_values) if @field_values

    @sorted_column = params[:sorted_column]
    @sorting_method = params[:sorting_method]

    #for js
    @service_registrations = @service.service_leaf.service_registrations(true) # discard cached objects for latest result in accepted_registrants
  end

=begin
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
=end
  
  def destroy
    @service_registration = ServiceRegistration.find(params[:id])
    @service = @service_registration.service
    @service_registration.destroy

    # for js
    # not redirect to services#index for better performance
    @type=params[:type]
    if @type=="admin"
      @service_registrations = @service.service_registrations
    else
      @super_service = @service.super_service
      @services = @service.sibling_services
      @services = my_services(@services) if session[:my_services_switch]=="on"
    end
    
    respond_with(@service_registration)
  end
end

