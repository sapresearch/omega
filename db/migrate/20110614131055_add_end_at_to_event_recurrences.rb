class AddEndAtToEventRecurrences < ActiveRecord::Migration
  def self.up
    change_table :event_recurrences do |t|
      t.datetime :end_at
    end
  end

  def self.down
    remove_column :event_recurrences, :end_at
  end
end
