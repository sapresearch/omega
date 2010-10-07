class Contact < ActiveRecord::Base
  PERM_ADMIN     = 'contacts_admin'
  PERM_EDIT_SELF = 'contacts_edit_self'
  PERM_VIEW      = 'contacts_view'
  PERM_VIEW_SELF = 'contacts_view_self'

  TITLES = %w{ mr. dr. ms. mrs.}

  class << self
    def for(user) where('user_id = ?', user).first end
  end

  self.include_root_in_json = false

  belongs_to :user
  has_and_belongs_to_many :interests, :join_table => 'contact_contacts_interests'
  has_and_belongs_to_many :skills,    :join_table => 'contact_contacts_skills'

  has_many :group_positions, :dependent => :destroy
  has_many :groups, :through => :group_positions

  has_many :addresses,     :as => :contact, :dependent => :destroy
  has_many :phone_numbers, :as => :contact, :dependent => :destroy

  accepts_flattened_values_for :interests, :skills, :value => :name

  accepts_nested_attributes_for :addresses, :phone_numbers,
                                :reject_if => NestedHelper::REJECT_TEMPLATE, :allow_destroy => true

  default_scope order('last_name, first_name')
  scope :ordered, order('last_name, first_name')

  scope :named, lambda { |name| where('last_name like ? or first_name like ?', "%#{name}%", "%#{name}%") }

  validates :title,      :presence  => true,
                         :inclusion => { :in => TITLES }
  validates :email,      :presence  => true,
                         :length    => 6..80,
                         :email     => true,
                         :unless    => :has_user?

  validates :first_name, :length    => 0..80,
                         :unless    => :has_user?
  validates :last_name,  :presence  => true,
                         :length    => 1..80
#                         :unless    => :has_user?

  after_save :sync_to_user, :unless => :synced?

  SYNC_FIELDS = %w(email first_name last_name)

  def sync_from_user
    return unless has_user?

    SYNC_FIELDS.each { |attr| send("#{attr}=", user.send(attr)) }
    save(:validate => false)
  end

  def sync_to_user
    return unless has_user?

    SYNC_FIELDS.each { |attr| user.send("#{attr}=", send(attr)) }
    user.send(:save, :validate => false)
  end

  def synced?
    return true unless has_user?

    SYNC_FIELDS.all? { |attr| send(attr) == user.send(attr) }
  end

  private
    def has_user?
      !user.nil?
    end
end
