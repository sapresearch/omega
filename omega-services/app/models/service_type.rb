class ServiceType < ActiveRecord::Base
  has_many :services, :dependent => :destroy
  belongs_to :service_category
end
