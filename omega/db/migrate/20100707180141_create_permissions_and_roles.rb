class CreatePermissionsAndRoles < ActiveRecord::Migration
  def self.up
    Permission.create! do |p|
      p.name  = 'View Users'
      p.group = 'Users'
      p.value = User::PERM_ADMIN
      p.description = ''
    end

    Role.create! do |r|
      r.name          = 'Anonymous'
      r.description   = ''
      r.locked        = true
      r.internal_name = Role::ANONYMOUS
    end
    Role.create! do |r|
      r.name          = 'Authenticated User'
      r.description   = ''
      r.locked        = true
      r.internal_name = Role::AUTHENTICATED_USER
    end
    Role.create! do |r|
      r.name        = 'Editor'
      r.description = ''
    end
    Role.create! do |r|
      r.name        = 'Administrator'
      r.description = ''
    end
  end

  def self.down
    Role.find_by_internal_name(Role::ANONYMOUS).try(:destroy)
    Role.find_by_internal_name(Role::AUTHENTICATED_USER).try(:destroy)
    Role.find_by_name('Editor').try(:destroy)
    Role.find_by_name('Administrator').try(:destroy)
  end
end
