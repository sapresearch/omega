class AddFeeToServiceLeaves < ActiveRecord::Migration
  def self.up
    change_table :service_leaves do |t|
      t.decimal :price, :precision => 8, :scale => 2, :default=>0.00
    end
  end

  def self.down
    remove_column :service_leaves, :price
  end
end
