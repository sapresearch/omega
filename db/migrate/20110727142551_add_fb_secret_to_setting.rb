class AddFbSecretToSetting < ActiveRecord::Migration
  def self.up
    add_column :settings, :fb_secret, :string
  end

  def self.down
    remove_column :settings, :fb_secret
  end
end
