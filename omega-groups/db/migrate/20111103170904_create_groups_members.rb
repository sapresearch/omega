class CreateGroupsMembers < ActiveRecord::Migration
  def self.up
    create_table :groups_members do |t|
      t.string :position
      t.references :group
      t.references :member
      t.timestamps
    end
  end

  def self.down
    drop_table :groups_members
  end
end
