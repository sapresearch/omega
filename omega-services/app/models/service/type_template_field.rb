class Service::TypeTemplateField < ActiveRecord::Base

  belongs_to :template
    has_one :value, :dependent => :destroy

  accepts_nested_attributes_for :value
  
  

end
