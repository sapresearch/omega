class Services::RegistrationsController < Omega::Controller

  respond_to :html, :xml, :js, :json

  breadcrumb 'Services' => :services
  breadcrumb 'Register' => :my_registrations_service_registrations
  
  before_filter :get_service

  def index
    @registrations = Service::Registration.all
    respond_with(@registrations)
  end

  def show
    @registration = Service::Registration.find(params[:id])
    respond_with(@registration)
  end

  def my_registrations
    @services = Service.joins(:registrations).where('service_registrations.contact_id = ?', Contact.for(current_user))
  end

  def new
     @service_fields = Service::Field.find_all_by_field_category("Service Details")
     @registration_fields = Service::Field.find_all_by_field_category("Registration Details")
     @registration = Service::Registration.new
     @registration.fieldvalues.build
     @contact = Contact.for(current_user)
     logger.debug("Contact: #{@contact}")
     respond_with(@registration)
  end

  def create
     @registration = Service::Registration.create(params[:service_registration])
     respond_with(@registration)
  end

  def edit
       @registration = Service::Registration.find(params[:id])
       respond_with(@registration)
  end

  def update
       @registration.update_attributes(params[:service_registration])
       respond_with(@registration)
  end

  def destroy
    @registration = Service::Registration.find_by_service_id_and_contact_id(params[:id],Contact.for(current_user))
    @registration.destroy
    redirect_to my_registrations_service_registrations_url
  end


   private
    def get_service
      if params[:service_id]
        @service = Service.find(params[:service_id])
      end
    end
end
