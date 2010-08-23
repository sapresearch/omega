class CreateVolunteeringDays < ActiveRecord::Migration
  def self.up
     create_table :volunteering_days do |t|
      t.integer :schedule_id, :null => false
      t.string :day
      t.datetime :start_time
      t.datetime :end_time
      t.integer :volunteers
      t.timestamps
    end
  end

  def self.down
    drop_table :volunteering_days
  end
end
