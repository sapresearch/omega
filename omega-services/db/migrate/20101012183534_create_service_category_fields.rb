class CreateServiceCategoryFields < ActiveRecord::Migration
  def self.up

     create_table :service_category_fields do |t|

      t.string :field_name, :null =>false
      t.string :field_type, :null=>false
      t.string :field_type_class
      t.string :field_category, :null=>false
      t.string :service_category, :null => false

      t.timestamps
     end

  end

  def self.down

    drop_table :service_category_fields
    
  end
end
