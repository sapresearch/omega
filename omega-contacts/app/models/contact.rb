class Contact < ActiveRecord::Base
  PERM_ADMIN     = 'contacts_admin'
  PERM_EDIT_SELF = 'contacts_edit_self'
  PERM_VIEW      = 'contacts_view'
  PERM_VIEW_SELF = 'contacts_view_self'

  TITLES = %w{ mr. dr. ms. mrs.}

  class << self
    def for(user) where('user_id = ?', user).first end
  end

  belongs_to :user
  has_and_belongs_to_many :interests, :join_table => 'contact_contacts_interests'
  has_and_belongs_to_many :skills,    :join_table => 'contact_contacts_skills'

  has_many :group_positions, :dependent => :destroy
  has_many :groups, :through => :group_positions

  has_many :addresses,     :as => :contact, :dependent => :destroy
  has_many :phone_numbers, :as => :contact, :dependent => :destroy

  accepts_nested_attributes_for :addresses, :phone_numbers,
                                :reject_if => NestedHelper::REJECT_TEMPLATE, :allow_destroy => true

  default_scope order('last_name, first_name')
  scope :orderd, order('last_name, first_name')

  validates :title,      :presence  => true,
                         :inclusion => { :in => TITLES }
  validates :email,      :presence  => true,
                         :length    => 6..80,
                         :email     => true,
                         :unless    => :has_user?
  validates :first_name, :length    => 0..80,
                         :unless    => :has_user?
  validates :last_name,  :presence  => true,
                         :length    => 1..80,
                         :unless    => :has_user?

  private
    def has_user?
      !user.nil?
    end
end
