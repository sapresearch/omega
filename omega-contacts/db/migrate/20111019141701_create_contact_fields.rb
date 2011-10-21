class CreateContactFields < ActiveRecord::Migration
  def self.up
    create_table :contact_fields do |t|
      t.string :name
      t.string :data_type

      t.timestamps
    end
  end

  def self.down
    drop_table :contact_fields
  end
end
