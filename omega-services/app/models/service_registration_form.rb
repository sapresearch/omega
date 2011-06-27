class ServiceRegistrationForm < ActiveRecord::Base
  belongs_to :service
  has_one :service_registration_template, :dependent => :destroy
end
