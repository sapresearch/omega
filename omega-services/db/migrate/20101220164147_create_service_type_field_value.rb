class CreateServiceTypeFieldValue < ActiveRecord::Migration
  def self.up
    create_table :service_type_field_values do |t|

      t.references :type_field, :null => false
      t.integer :type_id
      t.string :field_value, :null => false


       t.timestamps
    end
  end

  def self.down
    drop_table :service_type_field_values
  end
end
