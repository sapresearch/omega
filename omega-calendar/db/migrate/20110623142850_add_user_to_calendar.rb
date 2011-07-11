class AddUserToCalendar < ActiveRecord::Migration
  def self.up
    add_column :calendars, :user_id, :integer
  end

  def self.down
    drop_column :calendars, :user_id
  end
end
