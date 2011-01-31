class Service::TypeTemplateField::Value < ActiveRecord::Base

  belongs_to :type_template
  belongs_to :type_template_field

end
