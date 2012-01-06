module Omega
	class ServiceRegistrationTemplate < ActiveRecord::Base
	  belongs_to :service_registration_form
	  belongs_to :service
	end
end
