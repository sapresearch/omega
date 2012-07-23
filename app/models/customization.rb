class Customization < Model
  belongs_to :account
  has_one :setting

  has_attached_file :logo
  has_attached_file :homepage_picture
end