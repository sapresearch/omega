class AssignDefaultPermissions < ActiveRecord::Migration
  class Permission < ActiveRecord::Base

  end

  class Role < ActiveRecord::Base
    has_and_belongs_to :permissions
  end

  ASSIGNMENTS = {
    'anonymous' => ['users_register'],
    'authenticated_user' => ['users_change_own_username', 'users_register', 'users_view',
                             'messages_send', 'messages_view'],
    'editor' => ['permissions_assign_to_role', 'permissions_view', 'roles_admin', 'roles_view', 'users_admin',
                 'users_assign_to_role', 'users_change_own_username', 'users_register', 'users_view', 'sessions_admin',
                 'sessions_view', 'messages_admin', 'messages_send', 'messages_view'],
    'administrator' => ['permissions_assign_to_role', 'permissions_view', 'roles_admin', 'roles_view', 'users_admin',
                        'users_assign_to_role', 'users_change_own_username', 'users_register', 'users_view',
                        'sessions_admin', 'sessions_view', 'messages_admin', 'messages_send', 'messages_view']
  }

  def self.up
    ASSIGNMENTS.each do |role, permissions|
      role = Role.find_by_internal_name(role)
      role.permissions << Permission.where('value IN (?)', permissions)
      role.save!
    end
  end

  def self.down
    ASSIGNMENTS.each do |role, permissions|
      role = Role.find_by_internal_name(role)
      # TODO
      role.save!
    end
  end
end
