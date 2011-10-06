class Service::TypeTemplate < ActiveRecord::Base

  has_many :type_template_fields, :dependent => :destroy

  has_many :types

  

  accepts_nested_attributes_for :type_template_fields
  
end
