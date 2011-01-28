class CreateVolunteeringRecords < ActiveRecord::Migration
  def self.up
    create_table :volunteering_records do |t|
      t.references :position, :null => false
      t.references :contact,  :null => false
      t.string     :status,   :null => false
      t.text       :notes
      t.string     :action
      t.text       :more_information
      t.text       :admin_notes
      
      
      t.text       :volunteering_reason
      t.text       :my_idea
      
      t.string     :availability
      t.integer    :hours_per_week
      t.boolean    :day_time
      t.boolean    :evening_time
      t.string     :day_preference
      t.string     :evening_preference

      t.date       :start_date
      t.time       :start_time
      
      t.date       :end_date
      t.time       :end_time
      
      t.boolean    :volunteering_to_meet_requirements
      t.integer    :hours_required
      
      t.integer    :agreement
      
      t.timestamps
    end
  end

  def self.down
    drop_table :volunteering_records
  end
end
