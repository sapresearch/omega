class ServicesController < Omega::Controller

  require "service_app_adapter.rb"
  require "service_lib.rb"
  include ServiceAppAdapter
  include ServiceLib

  # app-spec
  breadcrumb 'Services' => :services
  # end app-spec

  respond_to :html, :js, :xml, :json

  def index
    @service_id = params[:service_id]
    @service = Service.find_by_id(@service_id) unless @service_id.nil?   # use find_by_id to return nil in case no record

    # redirect again when the target service is missing
    if @service_id && @service.nil?
      redirect_to services_url
      return
    end
    
    session[:super_service_id] = @service.nil? ? (params[:super_service_id] || session[:super_service_id]) : @service.super_service_id
    @super_service = super_service
    @services = sub_services_of(@super_service)

    # for my services
    session[:my_services_switch] = params[:my_services_switch] || session[:my_services_switch]

    @services = my_services(@services) if session[:my_services_switch]=="on"
    respond_with(@services)
  end

  def new
    session[:super_service_id] = params[:super_service_id] || session[:super_service_id]
    @service_level = params[:service_level] || Service::LEAF_LEVEL
    @super_service = super_service
    @service = new_sub_service_of(@super_service)
    @default_service_with_detail_template = @super_service ? @super_service.default_service_with_detail_template : nil
    @default_service_with_registration_template = @super_service ? @super_service.default_service_with_registration_template : nil

    # for js    
    @services_with_detail_template = Service.services_with_detail_template.sort{|s1,s2| s1.name<=>s2.name}
    @services_with_registration_template = Service.services_with_registration_template.sort{|s1,s2| s1.name<=>s2.name}

    # automatically cancel my services switch when creating a new service in order to view it.
    session[:my_services_switch]="off"
    respond_with(@service)
  end

  def create
    @service = Service.create(params[:service])

    # set the service level
    @service_level = params[:service_level]
    @service.create_service_leaf if @service_level==Service::LEAF_LEVEL

    @service_detail_html = params[:service_detail_html]
    @service_detail_field_values = params[:service_detail_field_values]
    @service_detail_form = @service.create_service_detail_form(:html => @service_detail_html, :field_values=>@service_detail_field_values) unless @service_detail_html.empty?
    @has_service_detail_template = params[:has_service_detail_template]
    @service_detail_form.create_service_detail_template if @has_service_detail_template == "on" && @service_detail_form

    @service_registration_html = params[:service_registration_html]   
    @service_registration_form = @service.create_service_registration_form(:html => @service_registration_html) unless @service_registration_html.empty?   
    @has_service_registration_template = params[:has_service_registration_template]
    @service_registration_form.create_service_registration_template if @has_service_registration_template == "on" && @service_registration_form
    
    respond_with(@service, :location=>services_url(:service_id=>@service.id))
  end

  def update
    @service = Service.find(params[:id])
    @recursive = (params[:recursive]=="true"||params[:recursive]==true) ? true :false
    case params[:type]
      when "publish"
        @service.publish(@recursive)
      when "unpublish"
        @service.unpublish(@recursive)
      else        
    end

    # for js
    @services = @service.sibling_services

    @services = my_services(@services) if session[:my_services_switch]=="on"
    respond_with(@service)
  end

  def destroy
    @service = Service.find(params[:id])
    @service.destroy 
    @super_service = super_service
    @services = sub_services_of(@super_service)

    @services = my_services(@services) if session[:my_services_switch]=="on"
    respond_with(@service)
  end


  private

  def super_service
    (session[:super_service_id] && session[:super_service_id]!=Service::ROOT_SUPER_SERVICE_ID ) ? Service.find(session[:super_service_id]) : nil
  end

  def sub_services_of(super_service)
    super_service ? super_service.sub_services : Service.service_roots
  end

  def new_sub_service_of(super_service)
    super_service ? super_service.sub_services.build : Service.new({:super_service_id=>nil})
  end

end

