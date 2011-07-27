class Image < Omega::Model

  has_attached_file :image,
                    #:url => "/images/application/logo.png",
                    #:path => ":rails_root/public/images/application/logo.png",
                    :url => "/images/application/logo/:id.png",
                    :path => ":rails_root/public/images/application/logo/:id.png",
                    :styles => { :small => "260x60!" }

  validates_attachment_content_type :image, :content_type => ['image/png', 'image/x-png', 'image/jpg', 'image/gif', 'image/jpeg' ]

	def self.get_last_id
		all_ids = Array.new
		Image.all.each { |image| all_ids.push(image.id) }
		all_ids.sort.last
	end
  
	def self.find_by_last_id
		Image.find(Image.get_last_id)
	end
end
