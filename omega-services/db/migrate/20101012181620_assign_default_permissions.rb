class AssignDefaultPermissions < ActiveRecord::Migration
  class Permission < ActiveRecord::Base

  end

  class Role < ActiveRecord::Base
    has_and_belongs_to_many :permissions
  end

  ASSIGNMENTS = {
    'anonymous' => ['service_view'],
    'authenticated_user' => ['service_apply', 'service_view'],
    'editor' => ['service_admin', 'service_apply', 'service_view', 'service_edit_user', 'service_edit_admin'],
    'administrator' => ['service_admin','service_apply', 'service_view', 'service_edit_user', 'service_edit_admin']
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
