class CreateGroupsRoles < ActiveRecord::Migration
  def self.up
    create_table :groups_roles do |t|
      t.references :group
      t.references :role
      t.timestamps
    end
  end

  def self.down
    drop_table :groups_roles
  end
end
