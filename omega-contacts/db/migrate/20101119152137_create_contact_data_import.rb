class CreateContactDataImport < ActiveRecord::Migration
  def self.up
    create_table :contact_data_imports do |t|

      t.text :rows
      t.text :new_rows

      t.timestamps
    end

  end

  def self.down
  end
end
