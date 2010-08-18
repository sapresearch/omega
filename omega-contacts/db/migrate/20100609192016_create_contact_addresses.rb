class CreateContactAddresses < ActiveRecord::Migration
  def self.up
    create_table :contact_addresses do |t|
      t.references :contact, :null => false, :polymorphic => true
      t.string     :address_type
      t.string     :street
      t.string     :city
      t.string     :state
      t.string     :zip_code
      t.string     :country
      t.text       :notes
      t.timestamps
    end
  end

  def self.down
    drop_table :contact_addresses
  end
end
