class CreateVolunteeringSchedules < ActiveRecord::Migration
  def self.up
    create_table :volunteering_schedules do |t|
      t.integer :position_id, :null => false
      t.string  :schedule_type, :null => false
      t.string  :value      
      t.date :start_date, :null => false
      t.date :end_date, :null => false
      t.timestamps
    end
  end

  def self.down
    drop_table :volunteering_schedules
  end
end
