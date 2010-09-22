class Service < ActiveRecord::Base
    
   has_many :fields, :dependent => :destroy
   has_many :registrations, :dependent => :destroy

   has_many :details, :dependent => :destroy

   has_one :type


   accepts_nested_attributes_for :fields, :details, :type, :allow_destroy => true


   has_attached_file :icon, :styles => { :small => "65x65>" },
                            :url => "/images/icons/services/:id/:style/:basename.:extension",
                            :path => ":rails_root/public/images/icons/services/:id/:style/:basename.:extension"

   validates_attachment_presence :icon
   validates_attachment_size :icon, :less_than => 1.megabytes
   validates_attachment_content_type :icon, :content_type => ['image/png']

end
