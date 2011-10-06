class CreateServices < ActiveRecord::Migration
  def self.up
    create_table :services do |t|

      t.string :service_name, :default => 'XYZ Service'
      t.references :type, :null => false
      t.text :description, :null => false
      t.boolean :published

      t.timestamps
    end
  end

  def self.down
    drop_table :services
  end
end
