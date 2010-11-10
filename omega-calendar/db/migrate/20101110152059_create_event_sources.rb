class CreateEventSources < ActiveRecord::Migration
  def self.up
    create_table :event_sources do |t|
      t.belongs_to :event
      t.belongs_to :source, :polymorphic => true
      t.text       :mapping
      t.timestamps
    end
  end

  def self.down
    drop_table :event_sources
  end
end
