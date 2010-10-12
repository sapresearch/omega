class AddAdminUser < ActiveRecord::Migration
  class Role < ActiveRecord::Record

  end

  class User < ActiveRecord::Record
    has_and_belongs_to_many :roles
  end

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
