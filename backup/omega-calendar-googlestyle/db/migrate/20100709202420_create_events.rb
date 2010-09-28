class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.references :calendar, :null=>false
      t.string     :title
      t.datetime   :start
      t.datetime   :end
      t.boolean    :allday
      t.text       :url
      t.text       :event_description
      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end
