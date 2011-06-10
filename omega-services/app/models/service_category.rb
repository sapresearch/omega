class ServiceCategory < ActiveRecord::Base
  has_many :service_types, :dependent => :destroy

end
