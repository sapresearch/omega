class Account < ActiveRecord::Base
	require 'user_account_mismatch_error'
	validates :name, :uniqueness => true

	# Create arrays of all models that inherit from Model.rb
	# These are then associated with Account in a has_many relationship, with :dependent => :destroy, so that they are destroyed when an account is destroyed.
	# The Model.subclasses method can't be used to access these models, because not Account is loaded before the other models.
	SUBCLASSES = [:asset_allocations, :assets, :blocks, :calendars, :components, :groups, :contacts, :users, :events, :favorites, :groups_members, :groups_requesters, :images, :menus, :messages, :pages, :payments, :posts, :roles, :service_registrations, :service_sections, :services, :sessions, :settings, :topics, :uploads, :deliveries, :event_recurrences, :groups_roles, :groups_topics, :groups_uploads, :menu_items, :page_blocks, :page_components, :permissions, :service_detail_forms, :service_detail_templates, :service_leaves, :service_registration_forms, :service_registration_form_values, :service_registration_templates, :user_tokens, :news_items, :news_item_sources]
	SUBCLASSES.each { |klass| has_many klass, :dependent => :destroy }

	SCOPED_SUBCLASSES = {calendar_events: '::Calendar::Event', calendar_event_sources: '::Calendar::EventSource', contact_addresses: '::Contact::Address', contact_group_positions: '::Contact::GroupPosition', contact_phone_numbers: '::Contact::PhoneNumber', contact_languages: '::Contact::Language', contact_imports: '::Contact::Import', volunteering_positions: '::Volunteering::Position', contact_fields: '::Contact::Field', contact_groups: '::Contact::Group', contact_skills: '::Contact::Skill', contact_interests: 'Contact::Interest', contact_values: '::Contact::Value', calendar_shares: '::Calendar::Share', contact_data_imports: '::Contact::DataImport', volunteering_records: 'Volunteering::Record', volunteering_contact_positions: '::Volunteering::ContactPosition', volunteering_schedules: '::Volunteering::Schedule', volunteering_time_entry_days: '::Volunteering::TimeEntry::Day', volunteering_days: '::Volunteering::Day', volunteering_records: '::Volunteering::Record', volunteering_time_entries: '::Volunteering::TimeEntry'}
	SCOPED_SUBCLASSES.each { |klass, class_name| has_many klass, :class_name => class_name, :dependent => :destroy }

	class << self
		def current
			Thread.current[:account]
		end

		def current=(account)
			Thread.current[:account] = account
		end
	end

	def with(session)
		Account.current = self
		current_user = current_user(session)
		if Account.current.has_user?(current_user) 
			yield
		end
	end

	def has_user?(user)
		if not user.is_anonymous?
			has_user = user.account == self
		elsif user.is_anonymous?
			has_user = true
		end
		has_user
	end
	
	def current_user(session)
		current_user = begin
			if session[:user_id]
				user = User.find_by_id(session[:user_id])
				# If the session hash has a user_id, but the user couldn't be found, then the user is probably from another account.
				raise UserAccountMismatchError.new if user.nil?
				user
			else
				User.anonymous
			end
		end
	end
	
	def self.new_and_save(params)
		@account = Account.new(params[:account])
		@account.save

		Account.current = @account
		roles, permissions = @account.build_roles_and_permissions
		@account.create_news_group
		@account.assign_roles_and_permissions(roles, permissions)
		@account.build_admin(params)
		@account.build_setting(params[:user][:email], params[:setting][:iso3166_region_code])
		@account.save
		@account
	end

	def build_admin(params)
		password = params[:user].delete(:password)
		confirm = params[:user].delete(:password_confirmation)
		email, username = params[:user][:email], params[:user][:username]
		admin = User.new(:email => email, :username => username)
		admin.password = password
		admin.password_confirmation = confirm
		admin.account = self
		admin.roles << Role.find_by_internal_name_and_account_id('administrator', self.id)

		contact = admin.build_contact(:first_name => params[:user][:first_name], :last_name => params[:user][:last_name], :account_id => self.id)
		contact.addresses.build(:account_id => self.id)
		contact.phone_numbers.build(:account_id => self.id)
		admin.save(:validate => false)
		admin.update_attribute(:first_name, params[:user][:first_name])
		admin.update_attribute(:last_name, params[:user][:last_name])
		admin
	end

	def create_news_group(group_name = name, recursive_loops = 0)
		news_chimp_uri = NewsItem::NEWS_CLASSIFIER_SERVICE_HOST + '/groups'
		begin
			result = Curl::Easy.http_post(news_chimp_uri, Curl::PostField.content('name', self.name))
			id = result.body_str.partition(':').last.gsub(/["} ]/, '')
			# recursively call the method until it finds a suitable name
			if id == '' and recursive_loops < 5
				create_news_group(name + 'a', recursive_loops + 1)
			elsif id != ''
				set = (Setting.first or Setting.new)
				set.news_group_id = id
				set.save
			end
		rescue StandardError
		end
	end

	def build_setting(email, region)
		setting = (Setting.first or Setting.new)
		setting.update_attributes(:email => email)
    setting.update_attributes(:iso3166_region_code => region)
		setting.update_attribute(:account_id, self.id)
		setting.save
		verify_setting_email(email) if Rails.env.production?
		setting
	end

	def verify_setting_email(email)
		require '../secret_key.rb'
		ses = AWS::SES::Base.new(:access_key_id => AWS_ACCESS[:access_key_id], :secret_access_key => AWS_ACCESS[:secret_access_key])
		ses.addresses.verify(email)
	end

	# Important. Use '_' in roles/permissions arrays to ensure that the account doesn't execute self.roles
	def assign_roles_and_permissions(_roles, _permissions)
		account_id = self.id

		# Make sure they're assigned to the right account.
		_roles.each { |r| r.update_attribute(:account_id, account_id) }
		_permissions.each { |r| r.update_attribute(:account_id, account_id) }

		# Assign default permissions to each role.
		self.roles.each do |role|
			default_perms = Role::DEFAULT_ASSIGNMENTS[role.internal_name]
			_permissions.each { |p| role.permissions << p if default_perms.include?(p.value) }
			role.save
		end
	end

	def build_roles_and_permissions
		_roles, _permissions = [], []
		Role::DEFAULT_ROLES.each_value do |role_attributes|
			_roles << roles.build(role_attributes)
		end
	  
		Permission::DEFAULT_PERMISSIONS.each_key do |perm|
			_permissions << permissions.build(name: perm.titleize, value: perm)
		end
		return _roles, _permissions
	end

end
