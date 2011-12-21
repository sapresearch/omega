class CreateContactImports < ActiveRecord::Migration
  def self.up
    create_table :contact_imports do |t|

    t.string :datatype
	  t.integer :processed, :default => 0
	  t.string :csv_file_name
	  t.string :csv_content_type
	  t.integer :csv_file_size

    t.timestamps
    end
  end

  def self.down
    drop_table :contact_imports
  end
end
