class Service::Field < ActiveRecord::Base

    belongs_to :service
    has_many :fieldvalues, :dependent => :destroy

    validates_presence_of :field_name, :field_type
    
end

