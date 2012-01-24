class AssignDefaultPermissions < ActiveRecord::Migration
	module Omega
	  class Permission < ActiveRecord::Base
  	end
  end

	module Omega
  	class Role < ActiveRecord::Base
   		has_and_belongs_to_many :permissions
  	end
  end

  ASSIGNMENTS = {
    'anonymous' => ['users_register', 'volunteering_view', 'groups_view'],
    'authenticated_user' => ['users_change_own_username', 'users_register', 'users_view',
                             'messages_send', 'messages_view', 'contacts_edit_self', 'contacts_view',
														 'contacts_view_self', 'volunteering_apply', 'volunteering_record_own_hours',
														 'volunteering_view', 'groups_view', 'myomega_view'],
    'editor' => ['permissions_assign_to_role', 'permissions_view', 'roles_admin', 'roles_view', 'users_admin',
                 'users_assign_to_role', 'users_change_own_username', 'users_register', 'users_view', 'sessions_admin',
                 'sessions_view', 'messages_admin', 'messages_send', 'messages_view', 'contacts_admin',
				 				 'contacts_edit_self', 'contacts_export', 'contacts_view', 'contacts_view_self', 'volunteering_admin',
				 				 'volunteering_apply', 'volunteering_assign', 'volunteering_record_hours', 'volunteering_record_own_hours',
				 				 'volunteering_view', 'groups_admin', 'groups_view', 'myomega_admin', 'myomega_view'],
    'administrator' => ['permissions_assign_to_role', 'permissions_view', 'roles_admin', 'roles_view', 'users_admin',
                        'users_assign_to_role', 'users_change_own_username', 'users_register', 'users_view',
                        'sessions_admin', 'sessions_view', 'messages_admin', 'messages_send', 'messages_view',
												'contacts_admin', 'contacts_edit_self', 'contacts_export', 'contacts_view', 'contacts_view_self',
												'volunteering_admin', 'volunteering_apply', 'volunteering_assign', 'volunteering_record_hours',
                        'volunteering_record_own_hours', 'volunteering_view', 'groups_admin', 'groups_view', 'myomega_admin', 'myomega_view']
  }

  def self.up
    ASSIGNMENTS.each do |role, permissions|
      role = Omega::Role.find_by_internal_name(role)
			role.permissions << Omega::Permission.where('value IN (?)', permissions)
      role.save!
    end
  end

  def self.down
    ASSIGNMENTS.each do |role, permissions|
      role = Omega::Role.find_by_internal_name(role)
	  	permissions.each do |p|
				permission = Omega::Permission.where('value IN (?)', p)
				role.permissions.delete(permission)
			end
      role.save!
    end
  end
end
