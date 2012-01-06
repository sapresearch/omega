module Omega
	class ServiceDetailTemplate < ActiveRecord::Base
	  belongs_to :service_detail_form
	  belongs_to :service
	end
end
