class CreateContactDataImport < ActiveRecord::Migration
  def self.up
    create_table :contact_data_imports do |t|

      t.longtext :rows
      t.longtext :new_rows

      t.timestamps
    end

  end

  def self.down
  end
end
