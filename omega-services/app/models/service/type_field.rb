class Service::TypeField < ActiveRecord::Base

  belongs_to :type
  
  has_one :value, :dependent => :destroy

  accepts_nested_attributes_for :value 

end


