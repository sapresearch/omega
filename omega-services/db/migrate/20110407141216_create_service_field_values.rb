class CreateServiceFieldValues < ActiveRecord::Migration

  def self.up
     create_table :service_field_values do |t|

      t.references :field, :null => false
      t.integer :service_id
      t.string :field_value, :null => false


       t.timestamps
     end
  end

  def self.down
    drop_table :service_field_values
  end
end
