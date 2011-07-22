class CreateServiceSections < ActiveRecord::Migration
  def self.up
    create_table :service_sections do |t|

      t.datetime :start_at
      t.datetime :end_at
      t.interval :string  # number+unit e.g. 1 hour, 2 week, 3 month, 1 year, 1 month 1 week, etc.
      t.recurrence_time :integer
      t.references :service_leaf

      t.timestamps
    end
  end

  def self.down
    drop_table :service_sections
  end
end
