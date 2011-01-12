class FormBuilderController < Omega::Controller

  respond_to :html, :xml, :js, :json

  def dispatch_ui_element
    @field = Service::Field.new
    @field.build_detail

    type = ''
    type_class = ''
    field = ''
    default = ''
   
    case params[:element]
      when 'input'
        type = 'text'
        type_class = 'input'
        field = "Input Field"
        default = "Enter Text/Number/Email"

      when 'textarea'
        type = 'text'
        type_class = 'textarea'
        field = "Text Field"
        default = "Enter Text"

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
    @field.detail.field_value = default
    @field.field_type = type
    @field.field_type_class = type_class

    render :partial => "form_builder/partials/#{type_class}", :locals => { :index => Time.now.to_i }

  end

  def dispatch_element_properties
    @em_id = params[:em_id].gsub(/ui-em-/,"")
    @category = params[:field_category]
    case params[:element]
      when 'input'
        render :partial => 'form_builder/partials/properties_input'
      when 'text'
        render :partial => 'form_builder/partials/properties_text'
      when 'textarea'
        render :partial => 'form_builder/partials/properties_textarea'
      when 'selectbox'
        render :partial => 'form_builder/partials/properties_selectbox'
      when 'date'
        render :partial => 'form_builder/partials/properties_date'
    end
  end

end