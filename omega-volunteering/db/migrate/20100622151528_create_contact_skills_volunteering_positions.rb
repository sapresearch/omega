class CreateContactSkillsVolunteeringPositions < ActiveRecord::Migration
  def self.up
    create_table :contact_skills_volunteering_positions, :id => false do |t|
      t.references :skill,    :null => false
      t.references :position, :null => false
    end
    add_index :contact_skills_volunteering_positions, [:skill_id, :position_id], :unique => true,
              :name => 'contact_skills_volunteering_positions_ids'
  end

  def self.down
    drop_table :contact_skills_volunteering_positions
  end
end
