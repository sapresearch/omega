	class Upload < Model
		self.table_name = :uploads

	  belongs_to :binding, :polymorphic => true  # works for Contact has_upload :photo. check Model.has_upload
	  has_attached_file :upload # from old Upload model (Paperclip::Attachment object)
	  
	  belongs_to :uploader, :class_name => 'User'
	  has_many :groups_uploads, :dependent=>:destroy
	  has_many :groups, :through=>:group_uploads
	end
