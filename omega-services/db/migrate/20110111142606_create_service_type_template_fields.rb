class CreateServiceTypeTemplateFields < ActiveRecord::Migration
   def self.up
    create_table :service_type_template_fields do |t|

      t.string :field_name, :null =>false
      t.string :field_type
      t.string :field_type_class
      t.string :field_category
      t.integer :type_template_id, :null => false
      
      t.timestamps
    end
  end

  def self.down
    drop_table :service_type_template_fields
  end
end
