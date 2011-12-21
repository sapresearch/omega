class AddTypeToServiceLeaves < ActiveRecord::Migration
  def self.up
    change_table :service_leaves do |t|
      t.string :type
    end
  end

  def self.down
    remove_column :service_leaves, :type
  end
end
