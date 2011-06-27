class CreateServiceLeaves < ActiveRecord::Migration
  def self.up
    create_table :service_leaves do |t|
      
      t.references :service

      t.timestamps
    end
  end

  def self.down
    drop_table :service_leaves
  end
end
