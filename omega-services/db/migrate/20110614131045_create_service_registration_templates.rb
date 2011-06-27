class CreateServiceRegistrationTemplates < ActiveRecord::Migration
  def self.up
    create_table :service_registration_templates do |t|
      
      t.references :service_registration_form

      t.timestamps
    end
  end

  def self.down
    drop_table :service_registration_templates
  end
end
