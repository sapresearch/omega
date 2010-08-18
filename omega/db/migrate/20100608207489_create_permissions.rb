class CreatePermissions < ActiveRecord::Migration
  def self.up
    create_table :permissions do |t|
      t.string :name,        :null => false
      t.string :group
      t.string :value,       :null => false
      t.text   :description
    end
    add_index :permissions, :value

    create_table :permissions_roles, :id => false do |t|
      t.references :permission, :null => false
      t.references :role,       :null => false
    end
    add_index :permissions_roles, [:permission_id, :role_id], :unique => true
  end

  def self.down
    drop_table :permissions_roles
    drop_table :permissions
  end
end
