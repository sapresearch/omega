	class Permission < Model
	  self.table_name = 'permissions'
	  PERM_ASSIGN_TO_ROLE = 'permissions_assign_to_role'
	  PERM_VIEW           = 'permissions_view'
	
		# Omega::Hosting::Accounts#new uses DEAULT_PERMISSIONS hash to create the correct permissions for each new account.
	  DEFAULT_PERMISSIONS = {
	    "permissions_assign_to_role"=>{},
	    "permissions_view"=>{},
	    "roles_admin"=>{},
	    "roles_view"=>{},
	    "users_admin"=>{},
	    "users_assign_to_role"=>{},
	    "users_change_own_username"=>{},
	    "users_register"=>{},
	    "users_view"=>{},
	    "sessions_admin"=>{},
	    "sessions_view"=>{},
	    "messages_admin"=>{},
	    "messages_send"=>{},
	    "messages_view"=>{},
	    "cms_admin"=>{},
	    "service_admin"=>{},
	    "service_apply"=>{},
	    "service_view"=>{},
	    "service_edit_user"=>{},
	    "service_edit_admin"=>{},
	    "contacts_admin"=>{},
	    "contacts_edit_self"=>{},
	    "contacts_export"=>{},
	    "contacts_view"=>{},
	    "contacts_view_self"=>{},
	    "volunteering_admin"=>{},
	    "volunteering_apply"=>{},
	    "volunteering_assign"=>{},
	    "volunteering_record_hours"=>{},
	    "volunteering_record_own_hours"=>{},
	    "volunteering_view"=>{},
	    "groups_admin"=>{},
	    "groups_view"=>{},
	    "myomega_admin"=>{},
	    "myomega_view"=>{}
	  }
	  
	  has_and_belongs_to_many :roles
	  belongs_to :account
	
	  validates :name,  :presence => true
	  validates :value, :presence => true#,
	                    #:uniqueness => true
	end
