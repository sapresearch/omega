class AddIso3166RegionCodeToSetting < ActiveRecord::Migration
  def up
    add_column :settings, :iso3166_region_code, :string, :default => 'CA'
  end

  def down
    remove_column :settings, :iso3166_region_code
  end
end
