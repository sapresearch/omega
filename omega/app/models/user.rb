require 'digest/sha2'

class User < Omega::Model
  PERM_ADMIN               = 'users_admin'
  PERM_ASSIGN_TO_ROLE      = 'users_assign_to_role'
  PERM_CHANGE_OWN_USERNAME = 'users_change_own_username'
  PERM_REGISTER            = 'users_register'
  PERM_VIEW                = 'users_view'
  MAX_USERS_PER_PAGE        = 30
  
  # These are the fields that are allowed when a user is registering (which is different from creating a user which
  # only an admin should be able to do.)
  #REGISTRATION_FIELDS = [:username, :password, :password_confirmation, :email, :first_name, :last_name, :time_zone]
  REGISTRATION_FIELDS = [:username, :password, :password_confirmation]

  scope :named, lambda { |name| where('last_name like ? or first_name like ?', "%#{name}%", "%#{name}%") }

  class << self
    def anonymous
      @anonymous ||= User.new do |anon|
        anon.username = "Anonymous"
        anon.roles << Role.for_anonymous
      end
    end
    
    def authenticate(username, password)
      if user = find_by_username(username) and user.authenticate(password)
        user
      end
    end

    def register(attributes = nil, &block)
    #  if attributes
       # not_allowed = attributes.keys.reject { |key| REGISTRATION_FIELDS.include?(key.to_sym) }
        #unless not_allowed.empty?
         # raise ArgumentError, "attribute(s) #{not_allowed.inspect} not allowed for registering"
        #end
      #end
      create(attributes, &block)
    end
  end

  has_and_belongs_to_many :roles
  
  has_one :contact

  has_many :messages,      :foreign_key => :to_id,   :class_name => '::Message', :inverse_of => :to,
                           :conditions => ['deleted_by_to_at IS NULL']
  has_many :sent_messages, :foreign_key => :from_id, :class_name => '::Message', :inverse_of => :from,
                           :conditions => ['deleted_by_from_at IS NULL']

  has_many :favorites
  has_many :favorite_items, :through => :favorites, :source => :item
  
  accepts_nested_attributes_for :contact

  attr_accessor :password, :password_confirmation

  validates :username,   :presence => true,
                         :uniqueness => true,
                         :length => 3..40
  validates :password,   :presence => true,
                         :confirmation => true,
                         :length => 5..40,
                         :if => :save_password?

 

  before_create :create_salt, :save_password
  before_update :save_password
  before_save   :ensure_has_authenticated_role

  def favorite_text
    "User: #{username}"
  end

  def authenticate(pass)
    password_hash == hash_password(pass)
  end

  def has_permission?(permission)
    permissions.map(&:value).include?(permission)
  end

  def is_anonymous?
    id.nil?
  end

  def is_logged_in?
    !is_anonymous?
  end

  def password_changed?
    password && !password.empty?
  end

  def permissions
    roles.collect(&:permissions).flatten.uniq
  end
  
  private
    def create_salt
      self.password_salt = 128.times.inject('') { |salt,| salt << rand(93) + 33 }
    end

    def ensure_has_authenticated_role
      role = Role.for_authenticated_user
      roles << role unless roles.include?(role)
    end

    def hash_password(pass)
      Digest::SHA512.hexdigest(pass + password_salt)
    end

    def save_password
      self.password_hash = hash_password(password) if save_password?
    end

    def save_password?
      new_record? or password_changed?
    end
end
