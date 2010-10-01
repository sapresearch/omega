class Permission < Omega::Model
  has_and_belongs_to_many :roles

  validates :name,  :presence => true
  validates :value, :presence => true,
                    :uniqueness => true
end
