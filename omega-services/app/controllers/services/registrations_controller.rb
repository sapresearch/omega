class Services::RegistrationsController < ApplicationController

  respond_to :html, :xml, :js, :json

  before_filter :get_service

  def index
    @services = Service.all
    @fields = Service::Field.all
    @fieldvalues = Service::Fieldvalue.all
    @registration = Service::Registration.find(params[:id])
    respond_with(@registration)
  end

  def show
    @services = Service.all
    @fields = Service::Field.all
    @fieldvalues = Service::Fieldvalue.all
    @registration = Service::Registration.find(params[:id])
    respond_with(@registration)
  end
  
  def new
     @fields = Service::Field.all
     @registration = Service::Registration.new
     @registration.fieldvalues.build
     respond_with(@registration)
  end

  def create
     @registration = Service::Registration.create(params[:service_registration])
     if @registration.save
       redirect_to service_service_registrations_url(@registration.service_id,:id => @registration.id)
     else
       render :action => 'new'
     end
  end

  def edit
       @registration = Service::Registration.find(params[:id])
       @fields = Service::Field.all
       respond_with(@registration)
  end

  def update
       @field = Service::Field.find(params[:id])
       @field.update_attributes(params[:field])
       respond_with(@field)
  end

  private
  def get_service
    if params[:service_id]
      @service = Service.find(params[:service_id])
    end
  end

end
