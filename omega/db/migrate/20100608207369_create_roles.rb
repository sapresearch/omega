class CreateRoles < ActiveRecord::Migration
  def self.up
    create_table :roles do |t|
      t.string     :name,          :null => false
      t.boolean    :default_role,  :null => false, :default => false
      t.boolean    :locked,        :null => false, :default => false
      t.string     :internal_name
      t.text       :description
      t.timestamps
    end
    add_index :roles, :name

    create_table :roles_users, :id => false do |t|
      t.references :role, :null => false
      t.references :user, :null => false
    end
    add_index :roles_users, [:role_id, :user_id], :unique => true
  end

  def self.down
    drop_table :roles_users
    drop_table :roles
  end
end
