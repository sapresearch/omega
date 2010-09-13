class CreateServiceFieldvalues < ActiveRecord::Migration
  def self.up
    create_table :service_fieldvalues do |t|

      t.integer :registration_id, :null => false
      t.integer :field_id, :null => false
      t.text :field_value, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :service_fieldvalues
  end
end
