class Upload < Omega::Model
  belongs_to :binding, :polymorphic => true
  #has_attached_file :upload
  
  belongs_to :uploader, :class_name => 'User'
  has_many :groups_uploads, :dependent=>:destroy
  has_many :groups, :through=>:group_uploads
end
