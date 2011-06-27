class ServiceLeaf < ActiveRecord::Base
  belongs_to :service
  has_many :service_registration, :dependent => :destroy

end
