class AddCapacityToServiceLeaves < ActiveRecord::Migration
  def self.up
    change_table :service_leaves do |t|
      t.integer :capacity
    end
  end

  def self.down
    remove_column :service_leaves, :capacity
  end
end
