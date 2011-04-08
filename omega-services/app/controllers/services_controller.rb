class ServicesController < Omega::Controller

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
  	
  def service_preview
   
    @service_type = Service::Type.find(params[:id])
    
    @registration_fields = Service::TypeField.where("type_id = ? and field_category = ? ", params[:id], "Registration Details")
    @service_fields = Service::TypeField.where("type_id = ? and field_category = ? ", params[:id], "Service Details")
    @details = Service::TypeField::Value.where("type_id = ?", params[:id])
    
   
    render :partial => 'service_preview'
    
  end

	
  def service_wizard

   session[:current_step] = params[:step]

  #@service_types = get_service_types # Populates the List of Service Types Existing in the Library

   @service_types = Service::Type.where("published = ?", 1)
   
   @service = Service.find_by_id(session[:service_id]) # Retrieve the Service Object to work on in the Wizard


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

#    @incomplete_service = Service::Type.find_by_id(session[:service_id])

#    unless @incomplete_service.nil?
#        @incomplete_service.destroy
#    end

    @service = Service.new
    
    @type = Service::Type.find(params[:types][:service_type])
   
    @service.description = @type.description
    @service.type_id = @type.id
    @service.published = '0'
#   @service_type.icon = File.new(@type.icon.path)

   
    @service.save(:validate => false)

    @service.fields.build do |f|
      f.build_value
    end if @service.fields.empty?
    
    @type.type_fields.each do |f|
      attributes = f.attributes.delete_if{|key, value| key == "id" || key =="type_id"}
      
      unless f.value.nil?
      value_attributes = f.value.attributes.delete_if{|key, value| key == "id" || key =="type_id" || key == "type_field_id"}
      end
      
      @field = Service::Field.new(attributes) 
      @field.service_id = @service.id
      @field.save
      
      unless value_attributes.nil?
      @field_value = Service::Field::Value.new(value_attributes) 
      @field_value.service_id = @service.id
      @field_value.field_id = @field.id
      @field_value.save
      end
      
    end
    session[:service_id] = @service.id

    redirect_to service_wizard_services_url(:step => 2 )    

    logger.debug("session[:service_id]: #{session[:service_id]}")
    
  end
  
  def update

    @service = Service.find_by_id(session[:service_id])
    @service.update_attributes(params[:service])

    # build nested attributes - fields ----------
   # if fields = params[:fields]
      #@service_type.type_fields_attributes = fields
    #  @service_type.type_fields.build = params[:fields]
     # @service_type.type_fields.each do |field|
     #   field.build_value unless field.value
      #  field.value.type_id ||= @service_type.id
     # end
    #end
	
  
    unless params[:fields].nil?
      params[:fields].each_value { |field| s_field = Service::Field.find_by_field_name(field.fetch("field_name"))
      	                                        s_field.value.field_value = field.fetch("field_value")										
    							  }
    end 
    
    
      
   
    #-------------------------------------------------------
    @current_step = session[:current_step]

 

    if params[:next] # Proceed to next step in the wizard
    	    											      
       session[:service_id] = @service.id
       redirect_to service_wizard_services_url(:step => 3)

    end

    
  end

  def finalize # Publish the Service

    @service = Service.find(params[:id])
    @service.update_attributes(:published => '1')

    redirect_to services_url

  end

  def destroy
    
    @service = Service.find(params[:id])
    @service.destroy
    
    redirect_to services_url
    
  end
  
#----------------------------------------------------------------------------------------------------------

 private

  def get_service_types # Retrieves All Service Types in the Library
    Service::Type.all.collect { |s| [s.service_type, s.id] }
  end

  def get_service_fields # Retrieves Service Fields based on a Service Category

    @registration_fields = Service::Field.where("service_id =? and field_category = ?", session[:service_id], "Registration Details")
    @service_fields = Service::Field.where("service_id =? and field_category = ?", session[:service_id], "Service Details")
    @details = Service::Field::Value.where("service_id = ?",session[:service_id])

  end


  
end

