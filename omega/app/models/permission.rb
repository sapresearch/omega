class Permission < Omega::Model
  PERM_ASSIGN_TO_ROLE = 'permissions_assign_to_role'
  PERM_VIEW           = 'permissions_view'

  has_and_belongs_to_many :roles

  validates :name,  :presence => true
  validates :value, :presence => true,
                    :uniqueness => true
end
