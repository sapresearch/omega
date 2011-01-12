class Services::TypesController < Omega::Controller


  def service_preview
   
    @service_type = Service::TypeTemplate.find(params[:id])
    
    @registration_fields = Service::TypeTemplateField.find_all_by_type_template_id_and_field_category(params[:id], "Registration Details")
    @service_fields = Service::TypeTemplateField.find_all_by_type_template_id_and_field_category(params[:id], "Service Details")
    @details = Service::TypeTemplateField::Value.find_all_by_type_template_id(params[:id])
    
    
    render :partial => 'service_preview'
  end


  def service_wizard

   session[:current_step] = params[:step]

  #@service_types = get_service_types # Populates the List of Service Types Existing in the Library

  @service_types = Service::TypeTemplate.all

  @service_type = Service::Type.find_by_id(session[:service_id]) # Retrieve the Service Object to work on in the Wizard


 # ------------ Retrieve the Registration and Service Detail Fields in Step 2,3 and 4 -----------
 
 

    unless @service_type.nil?

   #   get_service_fields

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
    
    @type = Service::TypeTemplate.find_by_id(params[:templates][:service_type])
    
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
      attributes = f.attributes.delete('id')
      attributes = f.attributes.delete("type_template_id")
      @field = Service::TypeField.new(attributes) 
      @field.type_id = @service_type.id
      @field.save
      
    end
    session[:service_id] = @service_type.id

    redirect_to service_wizard_service_types_url(:step => 2 )    

    logger.debug("session[:service_id]: #{session[:service_id]}")
    
  end


#----------------------------------------------------------------------------------------------------------

 private

  def get_service_types # Retrieves All Service Types in the Library
    Service::Type.all.collect { |s| [s.service_type, s.id] }
  end

  def get_service_fields # Retrieves Service Fields based on a Service Category

    @registration_fields = Service::TypeField.find_all_by_template_id_and_field_category(session[:service_id], "Registration Details")
    @service_fields = Service::TypeField.find_all_by_template_id_and_field_category(session[:service_id], "Service Details")
    @details = Service::TypeField::Value.find_all_by_template_id(session[:service_id])

  end


  
end

