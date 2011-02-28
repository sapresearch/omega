class AddCmsPermissions < ActiveRecord::Migration
  class Permission < ActiveRecord::Base

  end

  class Role < ActiveRecord::Base
    has_and_belongs_to_many :permissions
  end

  PERMISSIONS = {
    'cms_admin' => {}
  }

  ASSIGNMENTS = {
    'administrator' => ['cms_admin']
  }

  def self.up
    say_with_time "add_permissions" do
      PERMISSIONS.each do |value, attr|
        Permission.create!(attr.reverse_merge(:name => value.titleize).merge(:value => value))
      end
    end

    ASSIGNMENTS.each do |role, permissions|
      role = Role.find_by_internal_name(role)
      role.permissions << Permission.where('value IN (?)', permissions)
      role.save!
    end
  end

  def self.down
    say_with_time "remove_permissions" do
      Permission.where('value IN (?)', PERMISSIONS.keys).destroy_all
    end

    ASSIGNMENTS.each do |role, permissions|
      role = Role.find_by_internal_name(role)
      # TODO
      role.save!
    end
  end
end
