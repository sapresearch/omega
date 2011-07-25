class ServiceLeaf < ActiveRecord::Base
  belongs_to :service
  has_many :service_registrations, :dependent => :destroy
  has_many :contacts, :through=>:service_registrations

end
