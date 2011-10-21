class DropInvalidContactTables < ActiveRecord::Migration

  TABLES = %w{contact_contacts_values
  					contact_values
					contact_fields
				}
              
  def self.up
    TABLES.each do |table|
      drop_table table if table_exists?(table)
    end
  end

  def self.down
    TABLES.each do |table|
      create_table table unless table_exists?(table)
    end
  end
end
