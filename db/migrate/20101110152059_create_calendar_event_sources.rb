class CreateCalendarEventSources < ActiveRecord::Migration
  def self.up
    create_table :calendar_event_sources do |t|
      t.belongs_to :calendar
      t.belongs_to :event
      t.belongs_to :source,      :polymorphic => true
      t.boolean    :synchronize
      t.text       :mapping
      t.timestamps
    end
  end

  def self.down
    drop_table :calendar_event_sources
  end
end
