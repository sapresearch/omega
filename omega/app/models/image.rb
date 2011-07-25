class Image < Omega::Model
	belongs_to :setting

  has_attached_file :image,
                    :url => "/images/application/logo.png",
                    :path => ":rails_root/public/images/application/logo.png",
                    :styles => { :small => "260x60!" }

  validates_attachment_content_type :image, :content_type => ['image/png', 'image/x-png', 'image/jpg', 'image/gif', 'image/jpeg' ]

	def self.get_last_id
		all_ids = Array.new
		Image.all.each { |image| all_ids.push(image.id) }
		all_ids.sort.last
	end
  
end
