class AddImageInUseToImages < ActiveRecord::Migration
  def self.up
    add_column :images, :image_in_use, :boolean
  end

  def self.down
    remove_column :images, :image_in_use
  end
end
