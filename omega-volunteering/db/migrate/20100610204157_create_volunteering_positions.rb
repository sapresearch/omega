class CreateVolunteeringPositions < ActiveRecord::Migration
  def self.up
    create_table :volunteering_positions do |t|
      t.string     :name,                :null => false
      t.text       :description
      t.datetime   :start_date
      t.datetime   :end_date
      t.text       :hours
      t.integer    :positions_available, :null => false, :default => 1
      t.references :contact

      t.timestamps
    end
  end

  def self.down
    drop_table :volunteering_positions
  end
end
