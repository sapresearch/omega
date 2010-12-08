class CreateContactGroups < ActiveRecord::Migration
  def self.up
    create_table :contact_groups do |t|
      t.string     :group_type
      t.string     :group_name
      t.text       :description
      t.timestamps
    end
  end

  def self.down
    drop_table :contact_groups
  end
end
