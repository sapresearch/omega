class ChangeVolunteeringPositions < ActiveRecord::Migration
  def self.up
    add_column :volunteering_positions, :recurrence, :boolean, :after => :description
    add_column :volunteering_positions, :start, :datetime, :after => :description
    add_column :volunteering_positions, :end, :datetime, :after => :description

  end

  def self.down
  end
end
