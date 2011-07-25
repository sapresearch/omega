class AddImageIdToSetting < ActiveRecord::Migration
  def self.up
    add_column :settings, :image_id, :integer
  end

  def self.down
    remove_column :settings, :image_id
  end
end
