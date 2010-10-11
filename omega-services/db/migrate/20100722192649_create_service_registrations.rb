class CreateServiceRegistrations < ActiveRecord::Migration
  def self.up
    create_table :service_registrations do |t|

      t.integer :contact_id, :null => false
      t.integer :service_id, :null => false
      t.text :notes
      t.text :questions

      t.timestamps
    end
  end

  def self.down
    drop_table :service_registrations

  end
end
