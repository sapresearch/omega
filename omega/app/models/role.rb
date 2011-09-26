class Role < Omega::Model
  PERM_ADMIN = 'roles_admin'
  PERM_VIEW  = 'roles_view'

  ANONYMOUS          = 'anonymous'
  AUTHENTICATED_USER = 'authenticated_user'
  EDITOR             = 'editor'
  ADMINISTRATOR      = 'administrator'

  DEFAULT_ROLES = {
    'anonymous' => {
      :name        => 'Anonymous',
      :description => '',
      :locked      => true
    },
    'authenticated_user' => {
      :name         => 'Authenticated User',
      :description  => '',
      :default_role => true,
      :locked       => true
    },
    'editor' => {
      :name        => 'Editor',
      :description => ''
    },
    'administrator' => {
      :name        => 'Administrator',
      :description => ''
    }
  }
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

  validates :name,          :presence => true,
                            :uniqueness => true
  validates :internal_name, :presence => true,
                            :uniqueness => true,
                            :if => :locked?
end



