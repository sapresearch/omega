class Contact::Skill < ActiveRecord::Base
  has_and_belongs_to_many :contacts, :join_table => 'contact_contacts_skills'

  validates :name, :presence => true,
                   :uniqueness => true#,
#                   :contact_skill => true
end
