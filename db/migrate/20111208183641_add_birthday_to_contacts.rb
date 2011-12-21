class AddBirthdayToContacts < ActiveRecord::Migration
  def self.up
    add_column :contacts, :birthday, :date
  end

  def self.down
    remove_column :contacts, :birthday
  end
end
