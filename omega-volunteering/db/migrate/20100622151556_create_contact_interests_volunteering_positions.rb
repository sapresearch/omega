class CreateContactInterestsVolunteeringPositions < ActiveRecord::Migration
  def self.up
    create_table :contact_interests_volunteering_positions, :id => false do |t|
      t.references :interest, :null => false
      t.references :position, :null => false
    end
    add_index :contact_interests_volunteering_positions, [:interest_id, :position_id], :unique => true,
              :name => 'contact_interests_volunteering_positions_ids'
  end

  def self.down
    drop_table :contact_interests_volunteering_positions
  end
end
