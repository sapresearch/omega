class AddStatusToServiceRegistrations < ActiveRecord::Migration
  def self.up
    change_table :service_registrations do |t|
      t.string :status, :default => "pending"
    end
  end

  def self.down
    remove_column :service_registrations, :status
  end
end
