module Omega
	class ServiceRegistrationForm < Omega::Model
	  belongs_to :service
	  has_one :service_registration_template, :dependent => :destroy
	end
end
