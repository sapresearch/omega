class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string     :username,      :null => false
      t.string     :password_hash, :null => false, :limit => 128
      t.string     :password_salt, :null => false, :limit => 128
      t.string     :email
      t.string     :first_name
      t.string     :last_name
      t.timestamps
    end
    add_index :users, :username
    add_index :users, :email
  end

  def self.down
    drop_table :users
  end
end
