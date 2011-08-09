class AssignDefaultMyomegaPermissions < ActiveRecord::Migration
  class Permission < ActiveRecord::Base

  end

  class Role < ActiveRecord::Base
    has_and_belongs_to_many :permissions
  end

  ASSIGNMENTS = {
    'authenticated_user' => ['myomega_view'],
    'editor' => ['myomega_admin', 'myomega_view'],
    'administrator' => ['myomega_admin', 'myomega_view']
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
