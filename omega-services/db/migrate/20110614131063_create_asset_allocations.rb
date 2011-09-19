class CreateAssetAllocations < ActiveRecord::Migration
  def self.up
    create_table :asset_allocations do |t|
      t.references :asset
      t.references :service_leaf

      t.timestamps
    end
  end

  def self.down
    drop_table :asset_allocations
  end
end
