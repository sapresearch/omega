class ServicesController < Omega::Controller

  require "service_app_adapter.rb"
  include ServiceAppAdapter

  # app-spec
  breadcrumb 'Services' => :services
  # end app-spec

  def index
    session[:super_service_id] = params[:super_service_id] || session[:super_service_id]
    @super_service = super_service
    @services = sub_services_of(@super_service)
  end

  def new
    @super_service = super_service
    @service = new_sub_service_of(@super_service)
    @default_service_with_detail_template = @super_service ? @super_service.default_service_with_detail_template : nil
    @default_service_with_registration_template = @super_service ? @super_service.default_service_with_registration_template : nil

    # for js    
    @services_with_detail_template = Service.services_with_detail_template.sort{|s1,s2| s1.name<=>s2.name}
    @services_with_registration_template = Service.services_with_registration_template.sort{|s1,s2| s1.name<=>s2.name}
  end

  def create
    @service = Service.create(params[:service])

    # set the service level
    @service_level = params[:service_level]
    @service.create_service_leaf if @service_level=="leaf"

    @service_detail_html = params[:service_detail_html]
    @service_detail_field_values = params[:service_detail_field_values]
    @service_detail_form = @service.create_service_detail_form(:html => @service_detail_html, :field_values=>@service_detail_field_values) unless @service_detail_html.empty?
    @has_service_detail_template = params[:has_service_detail_template]
    @service_detail_form.create_service_detail_template if @has_service_detail_template == "on" && @service_detail_form

    @service_registration_html = params[:service_registration_html]   
    @service_registration_form = @service.create_service_registration_form(:html => @service_registration_html) unless @service_registration_html.empty?   
    @has_service_registration_template = params[:has_service_registration_template]
    @service_registration_form.create_service_registration_template if @has_service_registration_template == "on" && @service_registration_form

    redirect_to services_url
  end

  # problem using redirect_to services_url: always back to top level, sending DELETE /services request which is invalid.
  def destroy
    @service = Service.find(params[:id])
    session[:super_service_id] = @service.is_root? ? "root" : @service.super_service.id    # session get lost and need to reset?
    @service.destroy
    # redirect_to services_url   
    @super_service = super_service
    @services = sub_services_of(@super_service)
  end

  # private methods
  private

  def super_service
    (session[:super_service_id] && session[:super_service_id]!="root" ) ? Service.find(session[:super_service_id]) : nil
  end

  def sub_services_of(super_service)
    super_service ? super_service.sub_services : Service.service_roots
  end

  def new_sub_service_of(super_service)
    super_service ? super_service.sub_services.build : Service.new({:super_service_id=>nil})
  end
  
end

