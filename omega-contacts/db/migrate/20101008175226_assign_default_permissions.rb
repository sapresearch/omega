class AssignDefaultPermissions < ActiveRecord::Migration
  ASSIGNMENTS = {
#    'anonymous' => [],
    'authenticated_user' => ['contacts_edit_self', 'contacts_view', 'contacts_view_self'],
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
