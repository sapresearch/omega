class CreateServiceTypes < ActiveRecord::Migration
  def self.up
    create_table :service_types do |t|
      
      t.string :name, :default => 'new service type'
      t.text :description
      t.string :status, :null => false
      t.references :service_category, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :service_types
  end
end
