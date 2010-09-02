class CreateVolunteeringTimeEntryDays < ActiveRecord::Migration
  def self.up
    create_table :volunteering_time_entry_days do |t|

      t.integer :time_entry_id, :null => false
      t.string :day
      t.decimal :hours, :precision => 4, :scale => 2
      t.timestamps

    end
  end

  def self.down
    drop_table :volunteering_time_entry_days
  end
end
