class Image < Omega::Model

  has_attached_file :image,
                    :url => "/images/application/logo.png",
                    :path => ":rails_root/public/images/application/logo.png",
                    :styles => { :small => "260x60!" }

  validates_attachment_content_type :image, :content_type => ['image/png', 'image/x-png', 'image/jpg', 'image/gif', 'image/jpeg' ]
  
end