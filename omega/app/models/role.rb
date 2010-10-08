class Role < Omega::Model
  PERM_ADMIN = 'roles_admin'
  PERM_VIEW  = 'roles_view'

  ANONYMOUS          = 'anonymous'
  AUTHENTICATED_USER = 'authenticated_user'
  EDITOR             = 'editor'
  ADMINISTRATOR      = 'administrator'

  class << self
    def for_anonymous; where('internal_name = ?', ANONYMOUS).first end
    def for_authenticated_user; where('internal_name = ?', AUTHENTICATED_USER).first end
  end

  has_and_belongs_to_many :users
  has_and_belongs_to_many :permissions

  validates :name,          :presence => true,
                            :uniqueness => true
  validates :internal_name, :presence => true,
                            :uniqueness => true,
                            :if => :locked?
end
