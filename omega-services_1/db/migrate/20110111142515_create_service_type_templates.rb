class CreateServiceTypeTemplates < ActiveRecord::Migration
  def self.up
    create_table :service_type_templates do |t|

      t.string :type_name, :null =>false
      t.text :description
      
      t.timestamps
    end
  end

  def self.down
    drop_table :service_type_templates
  end

end
