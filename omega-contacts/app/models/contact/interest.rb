class Contact::Interest < ActiveRecord::Base
  has_and_belongs_to_many :contacts, :join_table => 'contact_contacts_interests'

  validates :name, :presence => true,
                   :uniqueness => true#,
#                   :contact_interest => true
end
