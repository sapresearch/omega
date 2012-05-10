	class Contact < Model
	  
	  require_dependency 'contact/address'
	  #require_dependency 'contact/group'
	  require_dependency 'contact/group_position'
	  require_dependency 'contact/import'
	  require_dependency 'contact/interest'
	  require_dependency 'contact/phone_number'
	  require_dependency 'contact/skill'
	  require_dependency 'contact/user_observer'
	  require 'zipcodr'
	
	  PERM_ADMIN     = 'contacts_admin'
	  PERM_EDIT_SELF = 'contacts_edit_self'
	  PERM_VIEW      = 'contacts_view'
	  PERM_VIEW_SELF = 'contacts_view_self'
	
	  TITLES = %w{ Mr Miss Ms Mrs}
	
	  attr_accessible :first_name, :last_name, :email, :phone_numbers_attributes, :addresses_attributes, :birthday, :over_18
    attr_accessible :account_id
	
	  scope :status, where('status IS NULL')
	  before_destroy { |contact| Contact::Value.destroy_all "contact_id = #{contact.id}" }
	
	  class << self
	    def for(user)
		 	contact = where('user_id = ?', user).first
	 		if contact.nil?
				contact = Contact.new(:first_name => user.first_name, :last_name => user.last_name)
				contact.email = user.email
				user.contact = contact if contact.save
				contact = user.contact
			end
			contact
		 end
	
		 def sorted_list(contact_id)
		 	all = self.all
			all.each do |c|
				if c.id == contact_id.to_i
					all.delete(c)
					all.unshift(c)
				end
			end
		end
	  end
	
	  self.include_root_in_json = false
	
	  belongs_to :user, :dependent=>:destroy
	  
	  has_and_belongs_to_many :interests, :join_table => 'contact_contacts_interests'
	  has_and_belongs_to_many :skills,    :join_table => 'contact_contacts_skills'
	  has_and_belongs_to_many :languages, :join_table => 'contact_contacts_languages'
	
	  #has_many :group_positions, :dependent => :destroy  
	  #has_many :groups, :through => :group_positions
	  has_many :uploads, :as => 'binding'  # relies on polymorphic association
	  has_upload :photo # relies on polymorphic association
	  accepts_nested_attributes_for :uploads
	  
	  has_many :groups_members, :dependent=>:destroy, :foreign_key=>"member_id"
	  has_many :joined_groups, :through=>:groups_members, :source=>:group
	
	  has_many :addresses,     :as => :contact, :dependent => :destroy
	  has_many :phone_numbers, :as => :contact, :dependent => :destroy
	  has_many :records, :class_name => "Volunteering::Record"
	
	  has_many :values
	  accepts_nested_attributes_for :values
	
	  #services associations
	  has_many :service_registrations, :dependent=>:destroy, :foreign_key=>"registrant_id"
	  has_many :service_leaves, :through=>:service_registrations
	  has_many :service_sections
	  has_many :payments, :foreign_key=>"payer_id"
	
	  def registered_services
	    service_leaves.map{|sl|sl.service}
	  end
	
	  def name
	    first_name.to_s + ", " + last_name.to_s
	  end
	
		def update_contact_attributes(params)
			custom_fields.each do |f|
				f_id = f.id
				c_id = self.id
				name = f.name.gsub(/\?/, '')
				value = params[name]
				if !value.nil?
					eav_row = Contact::Value.find_by_field_id_and_contact_id(f_id, c_id)
					if eav_row.nil?
						Contact::Value.create(:field_id => f_id, :contact_id => c_id, :value => value)
					elsif !eav_row.nil?
						eav_row.update_attributes(:value => value)
					end
				end
			end
			update_subclass_attributes(params)
			self.update_attributes(params)
		end
	
		def update_subclass_attributes(params)
			Contact::PhoneNumber.update_phone_numbers(params)
			Contact::Address.update_addresses(params)
		end
	
		accepts_flattened_values_for :interests, :skills, :languages, :value => :name
	
		accepts_flattened_values_for :phone_numbers, :value => :phone_numbers_attributes, :value => :number
	  accepts_nested_attributes_for :addresses, :phone_numbers,
	                                :reject_if => NestedHelper::REJECT_TEMPLATE, :allow_destroy => true
	
	  default_scope order('first_name, last_name')
	  scope :ordered, order('last_name, first_name')
	
	  scope :named, lambda { |name| where('last_name like ? or first_name like ?', "%#{name}%", "%#{name}%") }
	  
	  attr_accessor :email_confirmation
	
	  validates :email,      :presence  => true,
                           :confirmation => true,
	                         :length    => 6..80,
	                         :email     => true
	
	  validates :first_name, :presence  => true,
                           :length    => 0..80,
	                         :unless    => :has_user?
	  validates :last_name,  :presence  => true,
	                         :length    => 1..80,
	                         :unless    => :has_user?

#    validates :birthday,	 :presence  => false
    validates :over_18,    :presence =>  true,
                           :inclusion => {:in => [true, false]}
#                           ,:if  =>  :has_valid_birthday
	
	  after_save :sync_to_user, :unless => :synced?
	
	  SYNC_FIELDS = %w(email first_name last_name)
	
	  def sync_from_user
	    SYNC_FIELDS.each { |attr| send("#{attr}=", user.send(attr)) }
	    save(:validate => false)
	  end
	
	  def sync_to_user
	  	unless user.nil?
	    SYNC_FIELDS.each { |attr| user.send("#{attr}=", send(attr)) }
	    user.save(:validate => false)
	    mail = UserMailer.registration_confirmation(user).deliver
	    Delivery.create(:message_id => mail.message_id, :recipient => user.email, :content => '', :status => 'Sent' )
	   end
	  end
	
	 def synced?
	 	unless user.nil?
	    SYNC_FIELDS.all? { |attr| send(attr) == user.send(attr) }
	   end
	  end
	
		def self.method_missing(method, *args, &block)
		  super unless method =~ /^find_by_(.*)$/
		  name = $1
		  fields = Contact::Field.all.collect { |cf| cf.name }
		  if fields.include?(name)
		  	 field_id = Contact::Field.find_by_name(name).id
		  	 values = Contact::Value.find_by_value_and_field_id(args.at(0), field_id)
		  else super
		  end
		end
	
		def method_missing(method, *args, &block)
			fields = Contact::Field.find(:all).collect { |cf| cf.name }
			method_as_string = method.to_s.gsub(/=/, '')
			if not fields.index(method_as_string).nil?
				field_id = Contact::Field.find_by_name(method_as_string).id
				eav_row = Contact::Value.find_by_field_id(field_id)
				if not method.to_s.include? '=' # getter
					return eav_row.nil? ? nil : eav_row.value
				elsif method.to_s.include? '=' # setter
					setter(method, args, field_id, eav_row)
				end
			else super
			end
		end
	
		def setter(method, args, field_id, eav_row)
			data_type = Contact::Field.find(field_id).data_type
			value = args.at(0)
			value = convert(field_id, value).class.to_s 
			if eav_row.nil?
				Contact::Value.create(:field_id => field_id, :contact_id => self.id, :value => value)
			elsif !eav_row.nil?
				eav_row.update_attributes(:value => value)
			end
		end
	
		def convert(field_id, value)
			type = Contact::Field.find(field_id).data_type
			unless type.is_a?(String) and value.is_a?(String)
				case type
					when "True or False"
						value = value == true # Converts to boolean
					when "Integer"
						value = value.to_i
				end
			end
			value
		end
	
		def custom_fields(*position)
			fields = Contact::Field.find(:all)
			fields.select! { |f| f.volunteering_positions.include? position.at(0) } unless position.empty?
			fields
		end
	
		def latitude
			zip = self.zip_code
			Zipcodr::find(zip).lat
		end
	
		def longitude
			zip = self.zip_code
			Zipcodr::find(zip).long
		end
	
		def full_name
			if !self.first_name.nil? and !self.last_name.nil?
				self.first_name + " " + self.last_name
			else
				self.user.username
			end
		end
	
#		def over_18?
#			bday = self.birthday
#			today = Date.today
#			result = false
#			if bday == '' and self.is_18 == true
#				result = true
#			elsif (today.year - bday.year) < 18
#				result = false
#      elsif (today.year - bday.year) > 18
#        result = true
#			else # it equals 18
#				if (today.month - bday.month) > 0
#					result = true
#				elsif (today.month - bday.month) < 0
#					result = false
#				elsif (today.month - bday.month) == 0
#					if (today.day - bday.day) >= 0
#						result = true
#					else
#						result = false
#					end
#				end
#			end
#		end

    def has_valid_birthday
      if(!self.birthday.nil?)
        actual_age = (Date.today.year - self.birthday.year).to_i
        :over_18 ? actual_age > 18 : actual_age <=18
      end
    end
				
	
	  private
	    def has_user?
	      !user.nil?
	    end
	end
