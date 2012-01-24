class AddPermissions < ActiveRecord::Migration
  class Permission < ActiveRecord::Base

  end

  PERMISSIONS = {
    'permissions_assign_to_role' => {},
    'permissions_view' => {},

    'roles_admin' => {},
    'roles_view' => {},

    'users_admin' => {},
    'users_assign_to_role' => {},
    'users_change_own_username' => {},
    'users_register' => {},
    'users_view' => {},

    'sessions_admin' => {},
    'sessions_view' => {},

    'messages_admin' => {},
    'messages_send' => {},
    'messages_view' => {},
	
	'contacts_admin' => {},
    'contacts_edit_self' => {},
    'contacts_export' => {},
    'contacts_view' => {},
    'contacts_view_self' => {},
	
	'volunteering_admin' => {},
    'volunteering_apply' => {},
    'volunteering_assign' => {},
    'volunteering_record_hours' => {},
    'volunteering_record_own_hours' => {},
    'volunteering_view' => {},
	
	'groups_admin' => {},
    'groups_view' => {}
  }

  def self.up
    say_with_time "add_permissions" do
      PERMISSIONS.each do |value, attr|
        Permission.create!(attr.reverse_merge(:name => value.titleize).merge(:value => value))
      end
    end
  end

  def self.down
    say_with_time "remove_permissions" do
      Permission.where('value IN (?)', PERMISSIONS.keys).destroy_all
    end
  end
end
