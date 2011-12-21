class RemoveFieldValuesFromServiceRegistrations < ActiveRecord::Migration
  def self.up
    change_table :service_registrations do |t|
      t.remove :field_values
    end
  end

  def self.down
    add_column :service_registrations, :field_values, :text
  end
end
