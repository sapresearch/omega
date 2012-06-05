class Account < ActiveRecord::Base

	require 'user_account_mismatch_error'
	validates :name, :uniqueness => true
	has_many :users
	has_many :permissions
	has_many :roles
	has_one :setting
		
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
		@account.assign_roles_and_permissions(roles, permissions)
		@account.build_admin(params)
		@account.build_setting(params[:user][:email])
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

		contact = admin.build_contact(:account_id => self.id)
		contact.addresses.build(:account_id => self.id)
		contact.phone_numbers.build(:account_id => self.id)
		admin.save(:validate => false)
		admin
	end

	def build_setting(email)
		setting = Setting.create(:email => email, :account_id => self.id)
		setting.update_attribute(:account_id, self.id)
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
