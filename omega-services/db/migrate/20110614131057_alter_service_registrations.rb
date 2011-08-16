class AlterServiceRegistrations < ActiveRecord::Migration
  def self.up
    rename_column :service_registrations, :contact_id, :registrant_id
  end

  def self.down
    rename_column :service_registrations, :registrant_id, :contact_id
  end
end
