class Contact::Group < ActiveRecord::Base
  GROUP_TYPES = %w{Household Organization}

  has_many :group_positions, :dependent => :destroy
  has_many :contacts, :through => :group_positions
  
  has_many :addresses,     :as => :contact, :dependent => :destroy
  has_many :phone_numbers, :as => :contact, :dependent => :destroy

  accepts_nested_attributes_for :addresses, :phone_numbers,
                                :reject_if => NestedHelper::REJECT_TEMPLATE, :allow_destroy => true

  scope :with_contact,    lambda { |contact| where('id in (?)',     contact.group_ids) }
  scope :without_contact, lambda { |contact| where('id not in (?)', contact.group_ids) unless contact.groups.empty? }

  scope :households,    where('group_type = ?', 'Household')
  scope :organizations, where('group_type = ?', 'Organization')

  validate :group_type, :presence  => true,
                        :inclusion => { :in => GROUP_TYPES }
end