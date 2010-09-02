class CreateVolunteeringContactPositions < ActiveRecord::Migration
  def self.up
    create_table :volunteering_contact_positions do |t|
      t.references :contact,  :null => false
      t.references :position, :null => false
    end
    add_index :volunteering_contact_positions, [:contact_id, :position_id], :unique => true
  end

  def self.down
    drop_table :volunteering_contact_positions
  end
end
