class Account < ActiveRecord::Base

	require 'user_account_mismatch_error'
	validates :name, :uniqueness => true
	has_many :users
	has_many :permissions
	has_many :roles
		
	class << self
		def current
			Thread.current[:account]
		end

		def current=(account)
			Thread.current[:account] = account
		end
	end

	def with(session)
		previous, Account.current = Account.current, self
		current_user = current_user(session)
		if Account.current.has_user?(current_user)
			yield
		end
		ensure
			Account.current = previous
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
	
	def build_admin(params)
		password = params[:user].delete(:password)
		confirm = params[:user].delete(:password_confirmation)
		admin = User.new(:email => params[:user][:email], :username => params[:user][:username])
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
