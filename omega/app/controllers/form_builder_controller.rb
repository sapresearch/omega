class FormBuilderController < ApplicationController

  respond_to :html, :xml, :js, :json

  def dispatch_ui_element
    @field = Service::Field.new
    @field.build_detail

    type = ''
    type_class = ''


    @rand = rand(1000)
    case params[:element]
      when 'input'
        type = 'text'
        type_class = 'input'
      when 'text'
        type = 'text'
        type_class = 'text'
      when 'labelfield'
        type = 'text'
        type_class = 'labelfield'
      when 'selectbox'
        type = 'text'
        type_class = 'selectbox'
      when 'date'
        type = 'text'
        type_class = 'date'
    end

    @field.field_name = 'Label'
    @field.detail.field_value = 'Text'
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
      when 'labelfield'
        render :partial => 'form_builder/partials/properties_labelfield'
      when 'selectbox'
        render :partial => 'form_builder/partials/properties_selectbox'
      when 'date'
        render :partial => 'form_builder/partials/properties_date'
    end
  end

end