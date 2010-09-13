class CreateServiceRegistrations < ActiveRecord::Migration
  def self.up
    create_table :service_registrations do |t|

      t.integer :user_id
      t.integer :service_id, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :service_registrations

  end
end
