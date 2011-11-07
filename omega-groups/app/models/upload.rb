class Upload < Omega::Model
  #belongs_to :binding, :polymorphic => true
  belongs_to :uploader, :class_name => 'Contact'
  has_many :groups_uploads, :dependent=>:destroy
  has_many :groups, :through=>:group_uploads
  #has_attached_file :upload 
end
