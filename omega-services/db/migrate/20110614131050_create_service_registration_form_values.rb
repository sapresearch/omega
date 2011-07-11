class CreateServiceRegistrationFormValues < ActiveRecord::Migration
  def self.up
    create_table :service_registration_form_values do |t|

      t.references :service_registration
      t.text :field_values

      t.timestamps
    end
  end

  def self.down
    drop_table :service_registration_form_values
  end
end
