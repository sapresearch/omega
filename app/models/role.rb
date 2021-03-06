	class Role < Model
	  self.table_name = 'roles'
	  PERM_ADMIN = 'roles_admin'
	  PERM_VIEW  = 'roles_view'
	
	  ANONYMOUS          = 'anonymous'
	  AUTHENTICATED_USER = 'authenticated_user'
	  EDITOR             = 'editor'
	  ADMINISTRATOR      = 'administrator'
	
	  MAX_LENGTH = 100
	  PAGE_SIZE = 4.0

		# Omega::Hosting::Accounts#new uses DEAULT_ROLES hash to create the correct role for each new account.
	  DEFAULT_ROLES = {
	    'anonymous' => {
	      :name          => 'Anonymous',
	      :internal_name => 'anonymous',
	      :description   => '',
	      :locked        => true
	    },
	    'authenticated_user' => {
	      :name          => 'Authenticated User',
	      :internal_name => 'authenticated_user',
	      :description   => '',
	      :default_role  => true,
	      :locked        => true
	    },
	    'editor' => {
	      :name          => 'Editor',
	      :internal_name => 'editor',
	      :description   => ''
	    },
	    'administrator' => {
	      :name          => 'Administrator',
	      :internal_name => 'administrator',
	      :description   => ''
	    }
	  }

		# Omega::Hosting::Accounts#new uses DEAULT_ASSIGNMENTS hash to create the correct role-permission assignments for each new account.
	  DEFAULT_ASSIGNMENTS = {
	    "anonymous" => ["users_register", "service_view", "volunteering_view", "groups_view"],
	    "authenticated_user" => ["users_change_own_username", "users_register", "users_view",
	      "messages_send", "messages_view", "service_apply", "service_view", "contacts_edit_self",
	      "contacts_view", "contacts_view_self", "volunteering_apply", "volunteering_record_own_hours",
	      "volunteering_view", "groups_view", "myomega_view"],
	    "editor" => ["permissions_assign_to_role", "permissions_view", "roles_admin", 
	      "roles_view", "users_admin", "users_assign_to_role", "users_change_own_username",
	      "users_register", "users_view", "sessions_admin", "sessions_view", "messages_admin",
	      "messages_send", "messages_view", "service_admin", "service_apply", "service_view",
	      "service_edit_user", "service_edit_admin", "contacts_admin", "contacts_edit_self",
	      "contacts_export", "contacts_view", "contacts_view_self", "volunteering_admin",
	      "volunteering_apply", "volunteering_assign", "volunteering_record_hours",
	      "volunteering_record_own_hours", "volunteering_view", "groups_admin", "groups_view",
	      "myomega_admin", "myomega_view"],
	    "administrator" => ["permissions_assign_to_role", "permissions_view", "roles_admin", 
	      "roles_view", "users_admin", "users_assign_to_role", "users_change_own_username",
	      "users_register", "users_view", "sessions_admin", "sessions_view", "messages_admin",
	      "messages_send", "messages_view", "cms_admin", "service_admin", "service_apply",
	      "service_view","service_edit_user", "service_edit_admin", "contacts_admin",
	      "contacts_edit_self", "contacts_export", "contacts_view", "contacts_view_self",
	      "volunteering_admin", "volunteering_apply", "volunteering_assign", "volunteering_record_hours",
	      "volunteering_record_own_hours", "volunteering_view", "groups_admin", "groups_view",
	      "myomega_admin", "myomega_view"]
	    }
	
	  class << self
	    def for_anonymous; where('internal_name = ?', ANONYMOUS).first end
	    def for_authenticated_user; where('internal_name = ?', AUTHENTICATED_USER).first end
	  end

	  has_and_belongs_to_many :users
	  has_and_belongs_to_many :permissions
	  has_many :groups_roles, :dependent=>:destroy
	  has_many :groups, :through=>:groups_roles
	
	  validates :name,          :presence => true#,
	                            #:uniqueness => true
	  validates :internal_name, :presence => true#,
	                            #:uniqueness => true,
	                            #:if => :locked?
		validate :validate_current_account
	end
