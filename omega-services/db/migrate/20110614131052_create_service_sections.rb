class CreateServiceSections < ActiveRecord::Migration
  def self.up
    create_table :service_sections do |t|

      t.references :contact
      t.references :service_leaf
      t.references :event

      t.timestamps
    end
  end

  def self.down
    drop_table :service_sections
  end
end
