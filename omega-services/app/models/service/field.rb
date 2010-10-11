class Service::Field < ActiveRecord::Base

    belongs_to :service

    has_one :detail, :dependent => :destroy
    
    validates_presence_of :field_name, :field_type

   accepts_nested_attributes_for :detail
  
end

