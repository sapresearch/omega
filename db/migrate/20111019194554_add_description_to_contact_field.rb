class AddDescriptionToContactField < ActiveRecord::Migration
  def self.up
    add_column :contact_fields, :description, :string
  end

  def self.down
    remove_column :contact_fields, :description
  end
end
