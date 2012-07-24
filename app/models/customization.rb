class Customization < Model
  belongs_to :account
  has_one :setting

  has_attached_file :logo, :styles => { :fixed=>"300x100#"}
  has_attached_file :homepage_picture, :styles => { :fixed=>"550x360#"}
end