class AddBannerOrLogoToImages < ActiveRecord::Migration
  def self.up
    add_column :images, :banner_or_logo, :string
  end

  def self.down
    remove_column :images, :banner_or_logo
  end
end
