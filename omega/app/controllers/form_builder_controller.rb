class FormBuilderController < Omega::Controller

  respond_to :html, :xml, :js, :json

  def dispatch_ui_element
    @field = Service::TypeField.new
    @field.build_value

    type = ''
    type_class = ''
    field = ''
    default = ''
   
    logger.debug("params: #{params[:section]}")
    
    case params[:element]
      when 'input'
        type = 'text'
        type_class = 'input'
        field = "Input Field"
        default = "text"

      when 'textarea'
        type = 'text'
        type_class = 'textarea'
        field = "Text Field"
        default = "text"

      when 'selectbox'
        type = 'text'
        type_class = 'selectbox'
        field = "Select List"
        default = "Option1;Option2"

      when 'date'
        type = 'text'
        type_class = 'date'
        field = "Date"
        default = Date.today
        
    end

    @field.field_name = field
    @field.value.field_value = default
    @field.field_type = type
    @field.field_type_class = type_class

 	if params[:section] == "service"
    	@field.field_category = "Service Details"
    	render :partial => "form_builder/partials/#{type_class}", :locals => { :index => Time.now.to_i}

    else
    	@field.field_category = "Registration Details"
    	render :partial => "form_builder/partials/registration/#{type_class}", :locals => { :index => Time.now.to_i, :field => @field}


    end
   
  end

  def dispatch_element_properties
    @em_id = params[:em_id].gsub(/ui-em-/,"")
    @category = params[:field_category]
    case params[:element]
      when 'input'
      	if params[:field_category] == "service-details"
          render :partial => 'form_builder/partials/properties_input'
       else
       	  render :partial => 'form_builder/partials/registration/properties_input'

       end
      when 'text'
      	if params[:field_category] == "service-details"
                render :partial => 'form_builder/partials/properties_text'
        else
                render :partial => 'form_builder/partials/registration/properties_text'
	
        end
        
      when 'textarea'
      	
      	if params[:field_category] == "service-details"
        	render :partial => 'form_builder/partials/properties_textarea'
        else
                render :partial => 'form_builder/partials/registration/properties_textarea'
	
        end
      when 'selectbox'
      	
      	if params[:field_category] == "service-details"

        render :partial => 'form_builder/partials/properties_selectbox'
        
       else
       	        render :partial => 'form_builder/partials/registration/properties_selectbox'

       end
       
      when 'date'
      	
      	if params[:field_category] == "service-details"

        render :partial => 'form_builder/partials/properties_date'
        else
        	        render :partial => 'form_builder/partials/registration/properties_date'

        end
        
    end
  end

end