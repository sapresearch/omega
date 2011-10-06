class AlterServiceLeaves < ActiveRecord::Migration
  def self.up
    rename_column :service_leaves, :type, :register_type
  end

  def self.down
    rename_column :service_leaves, :register_type, :type
  end
end
