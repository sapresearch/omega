module Omega
	class ServiceDetailForm < ActiveRecord::Base
	  belongs_to :service
	  has_one :service_detail_template, :dependent => :destroy
	end
end
