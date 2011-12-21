class CreateEventRecurrences < ActiveRecord::Migration
  def self.up
    create_table :event_recurrences do |t|

      t.string :interval # json representation of time interval {"month":1, "day":10}
      t.integer :repetition_count
      t.references :event

      t.timestamps
    end
  end

  def self.down
    drop_table :event_recurrences
  end
end
