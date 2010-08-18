class CreateVolunteeringTimeEntries < ActiveRecord::Migration
  def self.up
    create_table :volunteering_time_entries do |t|
      t.references :volunteering_record, :null => false
      t.datetime   :day
      t.integer    :hours
    end
  end

  def self.down
    drop_table :volunteering_time_entries
  end
end
