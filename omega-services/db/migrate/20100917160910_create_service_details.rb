class CreateServiceDetails < ActiveRecord::Migration
  def self.up
     create_table :service_details do |t|

      t.references :field, :null => false
      t.integer :service_id, :null => false
      t.string :field_value, :null => false


       t.timestamps
     end
  end

  def self.down
  end
end
