class Service::Type < ActiveRecord::Base

  has_many :typefields, :dependent => :destroy

  belongs_to :service

  has_attached_file :icon, :styles => { :small => "65x65>" },
                            :url => "/images/icons/services/:id/:style/:basename.:extension",
                            :path => ":rails_root/public/images/icons/services/:id/:style/:basename.:extension"

   
  
end
