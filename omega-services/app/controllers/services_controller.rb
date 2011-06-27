class ServicesController < Omega::Controller

  load "service_app_adapter.rb"
  include ServiceAppAdapter
  
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
    @service_level = params[:service_level] || "leaf"  # default to be leaf service, otherwise "inner"
    @services_with_detail_template = Service.services_with_detail_template
    @services_with_registration_template = Service.services_with_registration_template
  end

  def create
    @service = Service.create(params[:service])
  end

  # working on this
  def destroy
    #Service.destroy(params[:id])
    redirect_to services_url
  end

  # private methods
  private
  
  def root_services
    Service.where(:super_service_id => nil)
  end

  def leaf_services
    all_service_ids = Service.all.map(&:id)
    inner_service_ids = Service.all.map(&:super_service_id).uniq
    all_service_ids - inner_service_ids
  end

  def super_service
    (session[:super_service_id] && session[:super_service_id]!="root" ) ? Service.find(session[:super_service_id]) : nil
  end

  def sub_services_of(super_service)
    super_service ? super_service.sub_services : root_services
  end

  def new_sub_service_of(super_service)
    super_service ? super_service.sub_services.build : Service.new({:super_service_id=>nil})
  end
  
end

