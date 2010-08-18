class CreateContactSkills < ActiveRecord::Migration
  def self.up
    create_table :contact_skills do |t|
      t.string     :name, :null => false
      t.timestamps
    end
    
    create_table :contact_contacts_skills, :id => false do |t|
      t.references :contact, :null => false
      t.references :skill,   :null => false
    end
    add_index :contact_contacts_skills, [:contact_id, :skill_id], :unique => true
  end

  def self.down
    drop_table :contact_contacts_skills
    drop_table :contact_skills
  end
end
