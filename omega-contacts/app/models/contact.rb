class Contact < Omega::Model
  require_dependency 'contact/address'
  require_dependency 'contact/group'
  require_dependency 'contact/group_position'
  require_dependency 'contact/import'
  require_dependency 'contact/interest'
  require_dependency 'contact/phone_number'
  require_dependency 'contact/skill'
  require_dependency 'contact/user_observer'

  PERM_ADMIN     = 'contacts_admin'
  PERM_EDIT_SELF = 'contacts_edit_self'
  PERM_VIEW      = 'contacts_view'
  PERM_VIEW_SELF = 'contacts_view_self'

  TITLES = %w{ Mr Miss Ms Mrs}

  attr_accessible :first_name, :last_name

  scope :status, where('status IS NULL')

  class << self
    def for(user) where('user_id = ?', user).first end
  end

  self.include_root_in_json = false

  belongs_to :user
  
  has_and_belongs_to_many :interests, :join_table => 'contact_contacts_interests'
  has_and_belongs_to_many :skills,    :join_table => 'contact_contacts_skills'
  has_and_belongs_to_many :languages, :join_table => 'contact_contacts_languages'


  has_many :group_positions, :dependent => :destroy
  has_many :groups, :through => :group_positions

  has_many :addresses,     :as => :contact, :dependent => :destroy
  has_many :phone_numbers, :as => :contact, :dependent => :destroy

  has_upload :photo

  has_many :uploads, :as => 'binding'
  has_many :values

  #services associations
  has_many :service_registrations, :dependent=>:destroy, :foreign_key=>"registrant_id"
  has_many :service_leaves, :through=>:service_registrations
  has_many :service_sections
  def registered_services
    service_leaves.map{|sl|sl.service}
  end

  def name
    first_name.to_s + ", " + last_name.to_s
  end

	def update_contact_attributes(params)
		puts "\n\n In update \n\n"
		puts "Contact. params hash: " + params.inspect.to_s
		custom_fields.each do |f|
			f_id = f.id
			c_id = self.id
			name = f.name.gsub(/\?/, '')
			value = params[name]
			if !value.nil?
				puts "Value for " + name.to_s + ": " + value.to_s
				eav_row = Contact::Value.find_by_field_id_and_contact_id(f_id, c_id)
				if eav_row.nil?
					puts "eav is nil NILLLLLLLLLLLLLLLLLLL"
					Contact::Value.create(:field_id => f_id, :contact_id => c_id, :value => value)
				elsif !eav_row.nil?
					puts "this is the custom field: " + f.inspect.to_s
					puts "This is eav row: " + eav_row.inspect.to_s
					puts 'will be updated with value: ' + value
					eav_row.update_attributes(:value => value)
				end
			else puts 'no value found for: ' + name
			end
		end
		update_subclass_attributes(params)
		self.update_attributes(params)
	end

	def update_subclass_attributes(params)
		Contact::PhoneNumber.update_phone_numbers(params)
		Contact::Address.update_addresses(params)
	 end

  accepts_nested_attributes_for :uploads

  accepts_flattened_values_for :interests, :skills, :languages, :value => :name

  accepts_flattened_values_for :phone_numbers, :value => :phone_numbers_attributes, :value => :number
  accepts_nested_attributes_for :addresses, :phone_numbers,
                                :reject_if => NestedHelper::REJECT_TEMPLATE, :allow_destroy => true

  default_scope order('last_name, first_name')
  scope :ordered, order('last_name, first_name')

  scope :named, lambda { |name| where('last_name like ? or first_name like ?', "%#{name}%", "%#{name}%") }
  
  attr_accessor :email_confirmation

  #validates :title,      :presence  => true,
                        # :inclusion => { :in => TITLES }
  validates :email,      :presence  => true,
  								 :confirmation => true,
                         :length    => 6..80,
                         :email     => true
                         
  validates :first_name, :length    => 0..80,
                         :unless    => :has_user?
  validates :last_name,  :presence  => true,
                         :length    => 1..80,
                         :unless    => :has_user?

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
		if method.to_s.include? 'find_by'
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

	def custom_fields
		Contact::Field.find(:all)
	end

  private
    def has_user?
      !user.nil?
    end
end


#class Hello
#	def say
#		puts 'hello world'
#	end
#old_say = self.instance_method(:say)
#define_method(:say) do
#	old_say.bind(self).call
#	puts 'success'
#end
#end
#
#h = Hello.new
