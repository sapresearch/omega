require 'role'
require 'permission'

class AssignDefaultPermissions < ActiveRecord::Migration
  ASSIGNMENTS = {
#    'anonymous' => [],
    'authenticated_user' => ['contacts_edit_self', 'contacts_view', 'contacts_view_self'],
    'editor' => ['contacts_admin', 'contacts_edit_self', 'contacts_export', 'contacts_view', 'contacts_view_self'],
    'administrator' => ['contacts_admin', 'contacts_edit_self', 'contacts_export', 'contacts_view', 'contacts_view_self']
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
