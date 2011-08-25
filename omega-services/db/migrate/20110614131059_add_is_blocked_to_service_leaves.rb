class AddIsBlockedToServiceLeaves < ActiveRecord::Migration
  def self.up
    change_table :service_leaves do |t|
      t.boolean :is_blocked, :default=>false
    end
  end

  def self.down
    remove_column :service_leaves, :is_blocked
  end
end
