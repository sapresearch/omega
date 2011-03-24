class Services::TypesController < Omega::Controller


  def service_preview
   
    @service_type = Service::TypeTemplate.find(params[:id])
    
    @registration_fields = Service::TypeTemplateField.where("type_template_id = ? and field_category = ? ", params[:id], "Registration Details")
    @service_fields = Service::TypeTemplateField.where("type_template_id = ? and field_category = ? ", params[:id], "Service Details")
    @details = Service::TypeTemplateField::Value.where("type_template_id =? ", params[:id])
    
    
    render :partial => 'service_preview'
  end


  def service_wizard

   session[:current_step] = params[:step]

  #@service_types = get_service_types # Populates the List of Service Types Existing in the Library

   @service_types = Service::TypeTemplate.all
   
   @service_type = Service::Type.find_by_id(session[:service_id]) # Retrieve the Service Object to work on in the Wizard


 # ------------ Retrieve the Registration and Service Detail Fields in Step 2,3 and 4 -----------
 
 

    unless @service_type.nil?

      get_service_fields

      session[:service_id] = @service_type.id

    end
    # ------------------------------------------
    

    case params[:step]

      when 'introduction'    
        render "services/types/wizard_introduction"

      when '1'
        render "services/types/step_1"

      when '2'
        render "services/types/step_2"

      when '3'
        render "services/types/step_3"

      when '4'
        render "services/types/step_4"
    end

  end


  def create

#    @incomplete_service = Service::Type.find_by_id(session[:service_id])

#    unless @incomplete_service.nil?
#        @incomplete_service.destroy
#    end

    @service_type = Service::Type.new
    
    @type = Service::TypeTemplate.find(params[:templates][:service_type])
    
    @service_type.description = @type.description
    @service_type.service_type = @type.type_name
    @service_type.published = '0'
    @service_type.type_name  = @type.type_name
#   @service_type.icon = File.new(@type.icon.path)

   
    @service_type.save(:validate => false)

    @service_type.type_fields.build do |f|
      f.build_value
    end if @service_type.type_fields.empty?
    
    @type.type_template_fields.each do |f|
      attributes = f.attributes.delete_if{|key, value| key == "id" || key =="type_template_id"}
      value_attributes = f.value.attributes.delete_if{|key, value| key == "id" || key =="type_template_id" || key == "type_template_field_id"}
      @field = Service::TypeField.new(attributes) 
      @field.type_id = @service_type.id
      @field.save
      
      @field_value = Service::TypeField::Value.new(value_attributes) 
      @field_value.type_id = @service_type.id
      @field_value.type_field_id = @field.id
      @field_value.save
      
    end
    session[:service_id] = @service_type.id

    redirect_to service_wizard_service_types_url(:step => 2 )    

    logger.debug("session[:service_id]: #{session[:service_id]}")
    
  end
  
  def update

    @service_type = Service::Type.find_by_id(session[:service_id])
    @service_type.update_attributes(params[:service_type])

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
      params[:fields].each_value { |field| @service_type.type_fields.build(field) do |f| 
      	                                  
           										f.build_value unless f.value
           										f.value.type_id ||= @service_type.id
    										end   
    										
    										}
    
    
    
     end 
      
   
    #-------------------------------------------------------
    @current_step = session[:current_step]

 

    if params[:next] # Proceed to next step in the wizard
       @service_type.save
       session[:service_id] = @service_type.id
      redirect_to service_wizard_service_types_url(:step => 3)

    end

    if params[:update] # Update after an edit action
      @service_type.save
      respond_with(@service_type)

    end
  end



#----------------------------------------------------------------------------------------------------------

 private

  def get_service_types # Retrieves All Service Types in the Library
    Service::Type.all.collect { |s| [s.service_type, s.id] }
  end

  def get_service_fields # Retrieves Service Fields based on a Service Category

    @registration_fields = Service::TypeField.where("type_id =? and field_category = ?", session[:service_id], "Registration Details")
    @service_fields = Service::TypeField.where("type_id =? and field_category = ?", session[:service_id], "Service Details")
    @details = Service::TypeField::Value.where("type_id = ?",session[:service_id])

  end


  
end

