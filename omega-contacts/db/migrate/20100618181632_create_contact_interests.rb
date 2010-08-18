class CreateContactInterests < ActiveRecord::Migration
  def self.up
    create_table :contact_interests do |t|
      t.string     :name, :null => false
      t.timestamps
    end

    create_table :contact_contacts_interests, :id => false do |t|
      t.references :contact,  :null => false
      t.references :interest, :null => false
    end
    add_index :contact_contacts_interests, [:contact_id, :interest_id], :unique => true
  end

  def self.down
    drop_table :contact_contacts_interests
    drop_table :contact_interests
  end
end
