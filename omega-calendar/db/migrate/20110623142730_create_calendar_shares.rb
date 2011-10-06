class CreateCalendarShares < ActiveRecord::Migration
  def self.up
    create_table :calendar_shares do |t|
      t.belongs_to :calendar
      t.belongs_to :shared_to
      t.boolean    :readable
      t.boolean    :writable
      t.timestamps
    end
  end

  def self.down
    drop_table :calendar_shares
  end
end
