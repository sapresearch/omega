class CreateServiceDetailTemplates < ActiveRecord::Migration
  def self.up
    create_table :service_detail_templates do |t|
      
      t.references :service_detail_form

      t.timestamps
    end
  end

  def self.down
    drop_table :service_detail_templates
  end
end
