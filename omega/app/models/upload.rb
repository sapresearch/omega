class Upload < Omega::Model
  belongs_to :binding, :polymorphic => true
  belongs_to :uploader, :class_name => '::User'

  has_attached_file :upload
end
