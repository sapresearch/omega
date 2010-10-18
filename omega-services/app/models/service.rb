class Service < ActiveRecord::Base

   PERM_ADMIN       = 'service_admin'
   PERM_APPLY       = 'service_apply'
   PERM_EDIT_ADMIN  = 'service_edit_admin'
   PERM_EDIT_USER   = 'service_edit_user'
   PERM_VIEW        = 'service_view'

   has_many :fields, :dependent => :destroy
   
   has_many :registrations, :dependent => :destroy

   has_many :details, :dependent => :destroy

   belongs_to :type

   has_one :event
   

   accepts_nested_attributes_for :fields, :details, :type, :event, :allow_destroy => true


   has_attached_file :icon, :styles => { :small => "65x65>" },
                            :url => "/images/icons/services/:basename.:extension",
                            :path => ":rails_root/public/images/icons/services/:basename.:extension",
                            :default_url => "/images/icons/services/default/missing.png"


   validates_attachment_content_type :icon, :content_type => ['image/x-png', 'image/png', 'image/jpg', 'images/jpeg', 'image/gif', 'image/bmp']



end
