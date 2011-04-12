class CreateVolunteeringPositions < ActiveRecord::Migration
  def self.up
    create_table :volunteering_positions do |t|
      t.string     :name,                :null => false
      t.text       :description
      t.text       :hours
      t.integer    :volunteers_required, :null => false
      t.references :contact
      t.datetime   :start
      t.datetime   :end
      t.boolean    :disclaimer_agreement
      t.timestamps
      t.boolean    :recurrent
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
      t.text       :agreement

    end
  end

  def self.down
    drop_table :volunteering_positions
  end
end
