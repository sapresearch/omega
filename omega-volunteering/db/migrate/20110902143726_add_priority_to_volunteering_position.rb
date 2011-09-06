class AddPriorityToVolunteeringPosition < ActiveRecord::Migration
  def self.up
    add_column :volunteering_positions, :priority, :string
  end

  def self.down
    remove_column :volunteering_positions, :priority
  end
end
