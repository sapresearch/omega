class Services::TypesController < Omega::Controller

  respond_to :html, :xml, :js, :json

  def index

    @service_types = Service::Type.all
    respond_with(@service_types)

  end

  def show

    @service_type = Service::Type.find(params[:id])
    respond_with(@service_type)

  end

  def new

    @service_type = Service::Type.new
    respond_with(@service_type)

  end


  def create

    @service_type = Service::Type.create(params[:service_type])
    respond_with(@service_type)


  end

  def edit

    @service_type = Service::Type.find(params[:id])
    respond_with(@service_type)

  end

  def update

    @service_type = Service::Type.find(params[:id])
    @service_type.update_attributes(params[:service_type])

    respond_with(@service_type)

  end

end
