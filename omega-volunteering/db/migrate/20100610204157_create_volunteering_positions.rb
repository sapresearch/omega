class CreateVolunteeringPositions < ActiveRecord::Migration
  def self.up
    create_table :volunteering_positions do |t|
      t.string     :name,                :null => false
      t.text       :description
      t.text       :hours
      t.integer    :volunteers_required, :null => false
      t.references :contact

      t.timestamps
    end
  end

  def self.down
    drop_table :volunteering_positions
  end
end
