class CreateContactLanguages < ActiveRecord::Migration
  def self.up
    create_table :contact_languages do |t|
      t.string     :name, :null => false
      t.timestamps
    end
    
    create_table :contact_contacts_languages, :id => false do |t|
      t.references :contact, :null => false
      t.references :language,   :null => false
    end
    add_index :contact_contacts_languages, [:contact_id, :language_id], :unique => true
  end

  def self.down
    drop_table :contact_contacts_languages
    drop_table :contact_languages
  end
end
