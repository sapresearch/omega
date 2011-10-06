class RemoveRepetitionCountFromEventRecurrences < ActiveRecord::Migration
  def self.up
    change_table :event_recurrences do |t|
      t.remove :repetition_count
    end
  end

  def self.down
    add_column :event_recurrences, :repetition_count, :integer
  end
end
