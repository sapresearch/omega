class AssignDefaultPermissions < ActiveRecord::Migration
  ASSIGNMENTS = {
    'anonymous' => ['users_register'],
    'authenticated_user' => ['users_change_own_username', 'users_register', 'users_view',
                             'messages_send', 'messages_view'],
    'editor' => :all,
    'administrator' => :all
  }

  def self.up
    ASSIGNMENTS.each do |role, permissions|
      role = Role.find_by_internal_name(role)
      case permissions
        when :all
          role.permissions << Permission.all
        when Array
          role.permissions << Permission.where('value IN (?)', permissions)
      end
      role.save!
    end
  end

  def self.down
    ASSIGNMENTS.each do |role, permissions|
      role = Role.find_by_internal_name(role)
      case permissions
        when :all
          # TODO
        when Array
          # TODO
      end
      role.save!
    end
  end
end
