class ServicesController < ApplicationController

  respond_to :html, :xml, :js, :json

  breadcrumb 'Services' => :services

  def index

    @services = Service.all
    respond_with(@services)

  end

  def show

    @service = Service.find(params[:id])
    respond_with(@service)

  end

  def show_drafts

    @services = Service.where('published =? ', 0)

  end

  def new

    @service = Service.new
    respond_with(@service)

  end


  def set_session

    case params[:choice]

      when 'service_type_Select_From_Existing_Types'
        session[:step1_choice] = "service_type_Select_From_Existing_Types"

      when 'service_type_New_Enrollable_Type'
        session[:step1_choice] = "service_type_New_Enrollable_Type"

      when 'service_type_New_Requestable_Type'
        session[:step1_choice] = "service_type_New_Requestable_Type"

    end

    session.delete(:errors)
    redirect_to service_wizard_services_url(:step => session[:current_step])

  end

  def service_wizard

    # --- Reset the Service Id Variable in the Session should the "introduction" step be approached

   session[:current_step] = params[:step]

   @services = get_service_types # Populates the List of Service Types Existing in the Library

   @service = Service.find_by_id(session[:service_id]) # Retrieve the Service Object to work on in the Wizard

   @service_types = Service::Type.all


    # ------------ Retrieve the Registration and Service Detail Fields in Step 2,3 and 4 -----------

    unless @service.nil?

      get_service_fields

      session[:service_id] = @service.id

    end
    # ------------------------------------------


    case params[:step]

      when 'introduction'

        render "services/wizard_introduction"

      when '1'
        render "services/step_1"

      when '2'
        render "services/step_2"

      when '3'
        render "services/step_3"

      when '4'
        render "services/step_4"
    end

  end

  def create

    @incomplete_service = Service.find_by_id(session[:service_id])

    unless @incomplete_service.nil?

        @incomplete_service.destroy

    end

    @service = Service.new

    @type = Service::Type.find_by_service_type(params[:service_library][:service_type])

    @service.service_category = @type.service_category
    @service.description = @type.description
    @service.service_type = @type.service_type
    @service.published = '0'
    @service.icon = File.new(@type.icon.path)

    @service.save

    session[:service_id] = @service.id

    redirect_to service_wizard_services_url(:step => 2)    

  end

  def modify_service # Edit Action

    @service = Service.find(params[:id])

    get_service_fields

    respond_with(@service)

  end


  def update

    @service = Service.find_by_id(session[:service_id])
    @service.update_attributes(params[:service])

    # build nested attributes - fields ----------

    unless params[:fields].nil?
      params[:fields].each_value { |field| @service.fields.build(field)
      }
    end

    #-------------------------------------------------------

    @current_step = session[:current_step]

    if params[:save] # Update the object in the wizard and remain on the current step
      @service.save
      redirect_to service_wizard_services_url(:step => 2)

    end

    if params[:next] # Proceed to next step in the wizard
      redirect_to service_wizard_services_url(:step => 3)

    end

    if params[:update] # Update after an edit action
      @service.save
      respond_with(@service)

    end
  end

  def finalize # Publish the Service

    @service = Service.find(params[:id])
    @service.update_attributes(:published => '1')

    redirect_to service_url(@service)

  end

  def define_service_type # Define a new Service Type and Create a New Service of that Type

    @errors = session[:errors]

    @service = Service.new

    @service.fields.build do |f|
      f.build_detail
    end if @service.fields.empty?

    @service.build_type.typefields.build

    case params[:service_category]

      when 'service_type_New_Enrollable_Type'
        render :partial => 'enrollable_service'

      when 'service_type_New_Requestable_Type'
        render :partial => 'requestable_service'
    end
  end


  def retrieve_existing_type # Retrieve An Existing Service Type and Create a New Service of that Type


    @service = Service.new

    # build nested fields for the service and further nested detail for each field -----------

    @service.fields.build do |f|
      f.build_detail
    end if @service.fields.empty?

    # ------------------------

    render :partial => 'create_service_form'

  end

  def add_service_field # Adds a Service Detail Field to an Existing Service

    @service = Service.find_by_id(session[:service_id])

    @field = Service::Field.new
    @field.build_detail

  end

  def add_registration_field # Adds a Service Registration Field to an Existing Service

    @field = Service::Field.new

  end

  def destroy

    @service = Service.find(params[:id])
    @service.destroy

    redirect_to services_url

  end

  #--------------------------------------------------------------------------------------------------
  private

  def get_service_types # Retrieves All Service Types in the Library
    Service::Type.all.collect { |s| [s.service_type, s.service_type] }
  end

  def get_service_fields # Retrieves Service Fields based on a Service Category

    @registration_fields = Service::Field.find_all_by_service_id_and_field_category(session[:service_id], "Registration Details")
    @service_fields = Service::Field.find_all_by_service_id_and_field_category(session[:service_id], "Service Details")
    @details = Service::Detail.find_all_by_service_id(session[:service_id])

  end


end
