#class CreateContactValues < ActiveRecord::Migration
#  def self.up
#    create_table :contact_values do |t|
#      t.integer :field_id
#      t.integer :contact_id
#      t.string :value
#
#      t.timestamps
#    end
#
#    create_table :contact_contacts_values, :id => false do |t|
#      t.references :contact, :null => false
#      t.references :values, :null => false
#    end
#    add_index :contact_contacts_values, [:contact_id, :contact_id], :unique => true
#  end
#
#  def self.down
#    drop_table :contact_contacts_values
#  end
#end
