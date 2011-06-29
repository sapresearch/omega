class CreateServiceRegistrations < ActiveRecord::Migration
  def self.up
    create_table :service_registrations do |t|
      
      t.references :service_leaf
      # app-spec
      t.references :contact
      # end app-spec
      t.text :field_values

      t.timestamps
    end
  end

  def self.down
    drop_table :service_registrations
  end
end
