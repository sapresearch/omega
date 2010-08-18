class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|

      t.integer :calendar_id, :null=>false
      t.string :title, :null => false
      t.time :start, :null=>false
      t.time :end, :null=>false
      t.boolean :allday
      t.text :url
      t.text :event_description
  

      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end
