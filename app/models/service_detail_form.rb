	class ServiceDetailForm < Model
	  belongs_to :service
	  has_one :service_detail_template, :dependent => :destroy
	end
