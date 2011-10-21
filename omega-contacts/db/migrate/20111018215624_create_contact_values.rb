class CreateContactValues < ActiveRecord::Migration
  def self.up
    create_table :contact_values do |t|
      t.integer :field_id
      t.integer :contact_id
      t.string :value

      t.timestamps
    end

  end

  def self.down
    drop_table :contact_values
  end
end
