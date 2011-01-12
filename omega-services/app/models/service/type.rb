class Service::Type < ActiveRecord::Base

  has_many :type_fields, :dependent => :destroy

  has_many :services

  validates :service_type, :presence => true, :uniqueness => true
  validates :description, :presence => true


  has_attached_file :icon, :styles => { :small => "65x65>" },
                            :url => "/images/icons/services/types/:basename.:extension",
                            :path => ":rails_root/public/images/icons/services/types/:basename.:extension",
                            :default_url => "/images/icons/services/types/default/missing.png"

 # accepts_nested_attributes_for :typefields
  
end
