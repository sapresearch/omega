module Omega
	require 'digest/sha2'
	
	class User < Omega::Model
	
	  set_table_name "users"
	
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
	        anon.roles << Omega::Role.for_anonymous
	      end
	    end
	    
	    def authenticate(username, password)
	      if user = find_by_username(username) and user.authenticate(password)
	        user
	      end
	    end
	
		 # I don't think that this is being used anymore
	    def register(attributes = nil, &block)
	    #  if attributes
	       # not_allowed = attributes.keys.reject { |key| REGISTRATION_FIELDS.include?(key.to_sym) }
	        #unless not_allowed.empty?
	         # raise ArgumentError, "attribute(s) #{not_allowed.inspect} not allowed for registering"
	        #end
	      #end
	      create(attributes, &block)
	    end
	
	    def all_users_with_zip
	      self.all.select { |u| !u.zip.nil? }
	    end
	  
	  end
	
	  has_and_belongs_to_many :roles
	  
	  has_one :contact
	  has_many :phone_numbers, :through => :contact
	  has_many :messages,      :foreign_key => :to_id,   :class_name => 'Omega::Message', :inverse_of => :to,
	                           :conditions => ['deleted_by_to_at IS NULL']
	  has_many :sent_messages, :foreign_key => :from_id, :class_name => 'Omega::Message', :inverse_of => :from,
	                           :conditions => ['deleted_by_from_at IS NULL']
	
	  has_and_belongs_to_many :skills,    :class_name => '::Contact::Skill',
	                                      :join_table => 'contact_skills_users'
	  has_many :favorites
	  has_many :favorite_items, :through => :favorites, :source => :item
	  has_one :setting
	
	  # association with groups and services
	  has_many :groups_requesters, :dependent=>:destroy, :foreign_key=>"requester_id"
	  has_many :requested_groups, :through=>:groups_requesters, :source=>:group
	  has_many :uploads, :foreign_key=>"uploader_id"
	  has_many :posts
	  accepts_nested_attributes_for :contact
	  #accepts_flattened_values_for :skills, :value => :name
	
	  attr_accessor :password, :password_confirmation
	  attr_accessible :username, :email, :contact_attributes
	
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
	
		def is_admin?
			self.roles.inject(false) { |admin, role| admin = admin == true ? true : role.internal_name == "administrator" }
		end
	
	  def password_changed?
	    password && !password.empty?
	  end
	
	  def permissions
	    roles.collect(&:permissions).flatten.uniq
	  end
	
	  def zip
		 zips = self.contact.nil? ? [] : self.contact.addresses.collect { |a| a.zip_code } # If no contact, return an empty array. Otherwise, return all zips.
		 zips.empty? ? nil : zips.at(0) # Only return the first zip code found.
	  end
	
	  def name
	    contact.name
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
end
