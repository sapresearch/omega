class CreateServiceTypeTemplateFieldValue < ActiveRecord::Migration
  def self.up
    create_table :service_type_template_field_values do |t|

      t.integer :template_field_id, :null => false
      t.integer :template_id
      t.text :field_value, :null => false


       t.timestamps
    end
  end

  def self.down
    drop_table :service_type_template_field_values
  end
end
