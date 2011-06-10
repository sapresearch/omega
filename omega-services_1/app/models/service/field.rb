class Service::Field < ActiveRecord::Base

    belongs_to :service

    has_one :value, :dependent => :destroy
    
    has_one :fieldvalue, :dependent => :destroy

    accepts_nested_attributes_for :value
  
end

