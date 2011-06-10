class CreateServices < ActiveRecord::Migration
  def self.up
    create_table :services do |t|

      t.string :name, :default => 'new service'
      t.text :description
      t.string :status, :null => false
      t.references :service_type, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :services
  end
end
