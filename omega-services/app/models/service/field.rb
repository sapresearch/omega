class Service::Field < ActiveRecord::Base

    belongs_to :service
    has_many :fieldvalues, :dependent => :destroy
    
    
end

