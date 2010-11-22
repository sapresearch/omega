class CreateCalendarEvents < ActiveRecord::Migration
  def self.up
    create_table :calendar_events do |t|
      t.belongs_to :calendar
      t.string     :name
      t.string     :url
      t.text       :description
      t.datetime   :start
      t.datetime   :end
      t.boolean    :all_day
      t.timestamps

      t.belongs_to :recurrence_series

      t.time       :recurrence_start_time
      t.time       :recurrence_end_time
      t.string     :recurrence_pattern
      t.string     :recurrence_every
      t.string     :recurrence_ordinal
      t.string     :recurrence_days
      t.integer    :recurrence_weeks
      t.integer    :recurrence_months
      t.integer    :recurrence_years
      t.date       :recurrence_start
      t.string     :recurrence_end_on
      t.date       :recurrence_end_at
      t.integer    :recurrence_end_after
    end
  end

  def self.down
    drop_table :calendar_events
  end
end
