require 'spec_helper'

def create_account(name)
		account = Account.new(name: name)
		roles, permissions = account.build_roles_and_permissions
		account.save!
		Account.current = account
		account.assign_roles_and_permissions(roles, permissions)
		account.build_setting('admin@test.com')
#		account.save!
    account
end

def create_volunteer(name)
  volunteer = User.new()
end

def create_admin(account)
  params = {
              user: {
                email: 'admin@test.com',
                password: 'admin',
                password_confirmation: 'admin',
                username: 'admin'
              }
           }
  admin = account.build_admin(params)
  account.save!
  Account.current = account
  admin.update_attribute(:account_id, account.id)
#  admin.save
#  account.save
  admin
end

describe "ManageServicesPageTest" do
  name = 'montreal'

  before :all do
    account = create_account(name)
    account.should be_valid
    Account.find_by_name(name).should_not be_nil

    roles = Role::DEFAULT_ROLES.count
    account.roles.count.should eq(roles)
    perms = Permission::DEFAULT_PERMISSIONS.count
    account.permissions.count.should eq(perms)
    Account.current=(account)

    admin = create_admin(account)
    admin.account_id.should eq(account.id)
    admin.username.should eq('admin')
#      puts User.first.inspect

#    user = create_user(account)
#    user.acccout_id.should eq(account.id)
#    user.username.should eq('bob')
  end

  describe "GET administer team pages contact list" do

    it 'displays the user registration form and attempts to register' do
      visit "/#{name}/users/register"
      page.should have_content('Registration')
      fill_in "user[contact_attributes][first_name]", :with => 'Bob'
      fill_in "user[contact_attributes][last_name]", :with => 'Smith'
      fill_in "user[contact_attributes][birthday]", :with => '01/01/2000'
      fill_in "user[contact_attributes][addresses_attributes][0][city]", :with => 'Montreal'
      fill_in 'user[contact_attributes][addresses_attributes][0][zip_code]', :with => 'V5T1L5'
      fill_in 'user[contact_attributes][phone_numbers_attributes][0][number]', :with => '213 213-5465'
      fill_in 'user[contact_attributes][email]', :with => 'bob.smith@mail.com'
      fill_in 'user[contact_attributes][email_confirmation]', :with => 'bob.smith@mail.com'
      fill_in 'user[username]', :with => 'bob'
      fill_in 'user[password]', :with => 'smith123'
      fill_in 'user[password_confirmation]', :with => 'smith123'
      click_button 'REGISTER'
      page.should have_content('Hello Bob!')
    end
  end
end

