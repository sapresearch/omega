require 'digest/sha2'

class AddAdminUser < ActiveRecord::Migration
  class Role < ActiveRecord::Base

  end

  class User < ActiveRecord::Base
    has_and_belongs_to_many :roles
  end

  def self.up
    User.new do |u|
      u.username = 'admin'
      u.password_salt = 128.times.inject('') { |salt,| salt << rand(93) + 33 }
      u.password_hash = Digest::SHA512.hexdigest('admin' + u.password_salt)
      u.roles << Role.find_by_internal_name('administrator')
    end.save(:validate => false)
  end

  def self.down
    User.where('username = ?', 'admin').destroy_all
  end
end
