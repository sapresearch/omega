require 'spec_helper'

def create_account(name)
		account = Account.new(name: 'test_account')
		roles, permissions = account.build_roles_and_permissions
		account.save
		Account.current = account
		account.assign_roles_and_permissions(roles, permissions)
		account.build_setting('test@test.com')
		account
end

def dual_accounts
	a = create_account('b')
	b = create_account('c')
	return a, b
end

params = {}
params[:account] = {:name=>"darkside"}
params[:user] = {:username=>"darkside", :password=>"password", :password_confirmation=>"password", :email=>"pmiller987@gmail.com"}
PARAMS = params

describe "Accounts" do

	it "Should be a valid account" do
		account = create_account('a')
		account.should be_valid
	end

	it "should have default roles and permissions" do
		account = create_account('a')
		roles = Role::DEFAULT_ROLES.count
		account.roles.count.should eq(roles)
		perms = Permission::DEFAULT_PERMISSIONS.count
		account.permissions.count.should eq(perms)
	end

	it "should have a default email" do
		account = create_account('a')
		account.setting.email.should =~ /[^ ]/#non blank screen with at least 4 chars?
	end
		

	# Security Tests

	it "should block updates to roles/permissions for another account" do
		account_a, account_b = dual_accounts
		b_id = account_b.id
		Account.current = account_a
		role, perm = Role.first, Permission.first
		role.update_attribute(:account_id, b_id)
		perm.update_attribute(:account_id, b_id)
		role.account_id.should eq(account_a.id)
		perm.account_id.should eq(account_a.id)
	end

	it "should block creating a role/permission for another account" do
		account_a, account_b = dual_accounts
		b_id = account_b.id
		Account.current = account_a
		role = Role.new(name: 'Hacker', internal_name: 'hacker', account_id: b_id)
		perm = Permission.new(name: 'Hacker', value: 'hacker', account_id: b_id)
		role.should be_invalid
		perm.should be_invalid
	end

	it "should block updating a user's account_id" do
		params = {user: { email: 'test@test.com', password: 'password', password_confirmation: 'password', username: 'tester' } }
		account_a, account_b = dual_accounts
		b_id = account_b.id
		admin = account_a.build_admin(params)
		Account.current = account_a
		admin.update_attribute(:account_id, b_id)
		admin.account_id.should eq(account_a.id)
	end

end
