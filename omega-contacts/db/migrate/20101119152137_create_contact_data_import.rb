class CreateContactDataImport < ActiveRecord::Migration
  def self.up
    create_table :contact_data_imports do |t|

      t.text :rows, :limit => "4294967295"
      t.text :new_rows, :limit => "4294967295"

      t.timestamps
    end

  end

  def self.down
    drop_table :contact_data_imports
  end
end
