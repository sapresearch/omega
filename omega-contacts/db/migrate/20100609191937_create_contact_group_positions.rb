class CreateContactGroupPositions < ActiveRecord::Migration
  def self.up
    create_table :contact_group_positions do |t|
      t.references :contact, :null => false
      t.references :group,   :null => false
      t.string     :position
    end
    add_index :contact_group_positions, [:contact_id, :group_id], :uniq => true
  end

  def self.down
    drop_table :contact_group_positions
  end
end
