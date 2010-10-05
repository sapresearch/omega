class AddColumnAction < ActiveRecord::Migration
    def self.up
      add_column :volunteering_records, :action, :string
    end

    def self.down
      remove_column :volunteering_records, :action
    end
  end