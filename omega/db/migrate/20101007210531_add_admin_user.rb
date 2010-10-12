require 'user'
require 'role'

class AddAdminUser < ActiveRecord::Migration
  def self.up
    User.new do |u|
      u.username = 'admin'
      u.password = 'admin'
      u.roles << Role.find_by_internal_name('administrator')
    end.save(:validate => false)
  end

  def self.down
    User.where('username = ?', 'admin').destroy_all
  end
end
