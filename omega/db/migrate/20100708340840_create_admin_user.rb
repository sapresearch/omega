class CreateAdminUser < ActiveRecord::Migration
  def self.up
    User.new do |u|
      u.username   = 'admin'
      u.password   = 'admin'
      u.email      = 'admin@site.com'
      u.first_name = ''
      u.last_name  = ''
      u.roles      = Role.all
    end.save(:validate => false)
  end

  def self.down
    User.find_by_username('admin').try(:destroy)
  end
end
