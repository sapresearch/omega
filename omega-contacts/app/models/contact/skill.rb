class Contact::Skill < Omega::Model
  has_and_belongs_to_many :contacts, :join_table => 'contact_contacts_skills'
  has_and_belongs_to_many :users, :join_table => 'contact_skills_users'
	attr_accessible :name

  validates :name, :presence => true,
                   :uniqueness => true#,
#                   :contact_skill => true
end
