class Service::Field < ActiveRecord::Base

    belongs_to :service

    has_one :value, :dependent => :destroy

    accepts_nested_attributes_for :value
  
end

