class Volunteering::Position < ActiveRecord::Base
  belongs_to :contact
  has_many :records
  has_and_belongs_to_many :skills,    :class_name => '::Contact::Skill',
                                      :join_table => 'contact_skills_volunteering_positions'
  has_and_belongs_to_many :interests, :class_name => '::Contact::Interest',
                                      :join_table => 'contact_interests_volunteering_positions'
end
