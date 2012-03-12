	class FormBuilderController < Controller
	  
	  respond_to :html, :xml, :js, :json
	
	  #creates a new field and renders it 
	 
	  def dispatch_ui_element
	    
	    @field = Service::TypeField.new
	    @field.build_value
	
	    type = ''   # datatype, for validation purposes
	    type_class = ''   # field/element type  
	    field = ''   # name of the field
	    default = '' # default value
	       
	    case params[:element] #type of field to be added
	      when 'input'
	        type = 'string'
	        type_class = 'input'
	        field = "Input Field"
	        default = "text"
	
	      when 'textarea'
	        type = 'text'
	        type_class = 'textarea'
	        field = "Text Field"
	        default = "text"
	
	      when 'selectbox'
	        type = 'boolean'
	        type_class = 'selectbox'
	        field = "Select List"
	        default = "Option1;Option2"  # For the selectbox the options need to be included through a semi-colon separated list
	
	      when 'date'
	        type = 'date'
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
	
	
	  # edit/modify properties of an already added field
	  
	  def dispatch_element_properties
	    
	    @em_id = params[:em_id].gsub(/ui-em-/,"") # parse the field id
	    
	    @field = Service::TypeField.find_by_id(@em_id)
	    
	    if @field.nil?                          # create an empty field, for the partials to get empty values   
	    	@field = Service::TypeField.new
	    	@field.build_value
	    end  
	    
	    @category = params[:field_category]
	    
	    if @category == "service-details"
	          partial = "partials"
	       else
	       	  partial = "partials/registration"
	    end
	       
	    case params[:element]
	             
	      when 'input'
	          
	          render :partial => "form_builder/#{partial}/properties_input"
	       	
	      when 'text'
	      	
	          render :partial => "form_builder/#{partial}/properties_text"
	        
	      when 'textarea'
	      	
	          render :partial => "form_builder/#{partial}/properties_textarea"
	        
	      when 'selectbox'
	          
	          render :partial => "form_builder/#{partial}/properties_selectbox"
	       
	      when 'date'
	      	
	      	  render :partial => "form_builder/#{partial}/properties_date"
	        
	    end
	  end
	
	end
