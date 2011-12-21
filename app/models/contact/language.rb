class Contact::Language < Omega::Model
  has_and_belongs_to_many :contacts, :join_table => 'contact_contacts_languages'

  validates :name, :presence => true,
                   :uniqueness => true#,
#                   :contact_skill => true
end
