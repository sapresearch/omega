class AddCustomizationIdToSettings < ActiveRecord::Migration
  def change
    add_column :settings, :customization_id, :integer
  end
end
