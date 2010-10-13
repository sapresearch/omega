class AssignDefaultPermissions < ActiveRecord::Migration
  class Permission < ActiveRecord::Base

  end

  class Role < ActiveRecord::Base
    has_and_belongs_to_many :permissions
  end

  ASSIGNMENTS = {
    'anonymous' => ['volunteering_view'],
    'authenticated_user' => ['volunteering_apply', 'volunteering_record_own_hours', 'volunteering_view'],
    'editor' => ['volunteering_admin', 'volunteering_apply', 'volunteering_assign', 'volunteering_record_hours',
                 'volunteering_record_own_hours', 'volunteering_view'],
    'administrator' => ['volunteering_admin', 'volunteering_apply', 'volunteering_assign', 'volunteering_record_hours',
                        'volunteering_record_own_hours', 'volunteering_view']
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
