class CreateServiceCategories < ActiveRecord::Migration
  def self.up
    create_table :service_categories do |t|
      
      t.string :name, :default => 'new service category'
      t.text :description
      t.string :status, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :service_categories
  end
end
