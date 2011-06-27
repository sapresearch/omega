class CreateServiceRegistrationForms < ActiveRecord::Migration
  def self.up
    create_table :service_registration_forms do |t|
      
      t.text :html
      t.references :service

      t.timestamps
    end
  end

  def self.down
    drop_table :service_registration_forms
  end
end
