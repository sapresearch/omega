class CreateContactSkillsUsersJoinTable < ActiveRecord::Migration
  def self.up
		create_table :contact_skills_users, :id => false do |t|
      t.references :skill, :null => false
      t.references :user,  :null => false
    end
    add_index :contact_skills_users, [:skill_id, :user_id], :unique => true,
              :name => 'contact_skills_users_ids'
  end

  def self.down
		drop_table :contact_skills_users
  end
end
