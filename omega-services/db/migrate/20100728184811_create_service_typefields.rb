class CreateServiceTypefields < ActiveRecord::Migration
  def self.up
    create_table :service_typefields do |t|
      t.string :field_name, :null =>false
      t.string :field_type, :null=>false
      t.integer :service_type_id, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :service_typefields
  end
end
