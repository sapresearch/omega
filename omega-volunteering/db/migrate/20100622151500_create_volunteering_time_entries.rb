class CreateVolunteeringTimeEntries < ActiveRecord::Migration
  def self.up
    create_table :volunteering_time_entries do |t|
      t.integer :record_id, :null => false
      t.date   :week
    end
  end

  def self.down
    drop_table :volunteering_time_entries
  end
end
