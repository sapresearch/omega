class CreateContactFieldsVolunteeringPositions < ActiveRecord::Migration
  def self.up
  	create_table :contact_fields_volunteering_positions, :id => false do |t|
		t.references :contact_field, :null => false
		t.references :volunteering_position, :null => false
	end
  end

  def self.down
  	drop_table :contact_fields_volunteering_positions
  end
end
