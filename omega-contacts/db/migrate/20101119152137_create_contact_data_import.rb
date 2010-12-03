class CreateContactDataImport < ActiveRecord::Migration
  def self.up
    create_table :contact_data_imports do |t|

      t.text :csv_rows, :limit => "4294967295"
      t.text :mapping, :limit => "4294967295"
      t.text :mapped_rows, :limit => "4294967295"
      t.text :imported_rows, :limit => "4294967295"
      t.string :status
      t.text :contact_ids, :limit => "4294967295"

      t.timestamps
    end

  end

  def self.down
    drop_table :contact_data_imports
  end
end
