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
      t.timestamps
    end
  end

  def self.down
    drop_table :volunteering_records
  end
end
