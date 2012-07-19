class Customization < Model
  belongs_to :account
  has_one :setting
end