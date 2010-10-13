class Service::Field < ActiveRecord::Base

    belongs_to :service

    has_one :detail, :dependent => :destroy

    accepts_nested_attributes_for :detail
  
end

