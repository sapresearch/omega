class AddOver18ToContacts < ActiveRecord::Migration
  def up
    add_column :contacts, :over_18, :boolean,  :default => false
  end
  def down
    remove_column :contacts, :over_18
  end
end
