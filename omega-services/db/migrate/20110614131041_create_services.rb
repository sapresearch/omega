class CreateServices < ActiveRecord::Migration
  def self.up
    create_table :services do |t|

      t.string :name
      t.text :description
      t.string :status, :null => false
      t.references :super_service

      t.timestamps
    end
  end

  def self.down
    drop_table :services
  end
end
