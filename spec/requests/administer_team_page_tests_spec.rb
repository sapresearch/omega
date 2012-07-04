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

  before :suite do
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

    it 'should allow admin to create new contact' do
      visit "/#{name}"
      page.should have_content 'Omega Non-Profit Portal'
      page.should have_content('Login')
      click_link "Login"
      fill_in "session[username]", :with => 'admin'
      fill_in "session[password]", :with => 'admin'
      click_button "Login"
      page.should_not have_content('Username or password is incorrect')
      page.should have_content('Administer Site')
      click_link 'Administer Team'
      page.should have_content 'Contacts'
      click_on 'New Contact'
      page.should have_content 'Photo'

      begin
        page.execute_script "$('#contact_title option').filter(function() { return $(this).text() == 'Mr'; }).attr('selected', true);"
        rescue Capybara::NotSupportedByDriverError
      end
      fill_in 'contact[first_name]', :with => 'Katy'
      fill_in 'contact[last_name]', :with => 'Perry'
      fill_in 'contact[email]', :with => 'katy.perry@test.com'
      fill_in 'contact[skills_values]', :with => 'singing'
      fill_in 'contact[interests_values]', :with => 'dancing'
      begin
        page.execute_script "$('#contact_addresses_attributes_0_address_type option').filter(function() { return $(this).text() == 'Work'; }).attr('selected', true);"
        rescue Capybara::NotSupportedByDriverError
      end
      fill_in 'contact[addresses_attributes][0][street]', :with => '947 North la Cienega Blvd.'
      fill_in 'contact[addresses_attributes][0][city]', :with => 'Los Angeles'
      fill_in 'contact[addresses_attributes][0][state]', :with => 'CA'
      fill_in 'contact[addresses_attributes][0][zip_code]', :with => ' 90069'
      fill_in 'contact[addresses_attributes][0][country]', :with => 'USA'
      begin
        page.execute_script "$('#contact_phone_numbers_attributes_0_number_type option').filter(function() { return $(this).text() == 'Cell'; }).attr('selected', true);"
        rescue Capybara::NotSupportedByDriverError
      end
      fill_in 'contact[phone_numbers_attributes][0][number]', :with => '(310) 854-3535'
      fill_in 'contact[phone_numbers_attributes][0][available_time]', :with => '1100'
      fill_in 'contact[phone_numbers_attributes][0][preferred_time]', :with => '1700'
      click_on 'Create'
      page.should have_content 'Katy Perry'

    end

    it 'should allow admin to click on a contact from list and show the contact details' do
      visit "/#{name}"
      page.should have_content 'Omega Non-Profit Portal'
      page.should have_content('Login')
      click_link "Login"
      fill_in "session[username]", :with => 'admin'
      fill_in "session[password]", :with => 'admin'
      click_button "Login"
      page.should_not have_content('Username or password is incorrect')
      page.should have_content('Administer Site')
      click_link 'Administer Team'

      page.find_link('Smith, Bob').visible?
      click_on 'Smith, Bob'
      page.should have_content 'Email: bob.smith@mail.com'
      click_on 'Addresses'
      page.should have_content 'City: Montreal'
      click_on 'Phone Numbers'
      page.should have_content 'Number (): 213 213-5465'
      click_on 'logout'
      page.should have_content 'Login'
    end

    it 'should allow admin to search for contact using the search box' do
      visit "/#{name}"
      page.should have_content 'Omega Non-Profit Portal'
      page.should have_content('Login')
      click_link "Login"
      fill_in "session[username]", :with => 'admin'
      fill_in "session[password]", :with => 'admin'
      click_button "Login"
      page.should_not have_content('Username or password is incorrect')
      page.should have_content('Administer Site')
      click_link 'Administer Team'

      fill_in 'ac-contacts', :with => 'Bob'
      page.find_link('Smith, Bob').click
      page.should have_content 'Email: bob.smith@mail.com'
      click_on 'logout'
      page.should have_content 'Login'
    end
  end

  describe 'administrative pages groups list' do
    it 'should allow admin to create a group' do
      visit "/#{name}"
      page.should have_content 'Omega Non-Profit Portal'
      page.should have_content('Login')
      click_link "Login"
      fill_in "session[username]", :with => 'admin'
      fill_in "session[password]", :with => 'admin'
      click_button "Login"
      page.should_not have_content('Username or password is incorrect')
      page.should have_content('Administer Site')
      click_link 'Administer Team'

      wait_until { page.has_selector? "#topnav li:eq(3) a" }
      begin
        page.execute_script "$('#topnav li:eq(5) a').trigger('mouseover')"
        rescue Capybara::NotSupportedByDriverError
      end
      page.find(:xpath, '#topnav li:eq(5) div').click_link('Groups')
      page.should have_content('All Groups')
      click_on 'Create a New Group'
      page.should have_content('Creating New Group')

      fill_in 'group[name]', :with => 'new test group'
      fill_in 'group[description]', :with => 'new test group description'
#      begin
#        page.execute_script "$('#group_super_group_id option').filter(function() { return $(this).text() == 'Bob, Smith'; }).attr('selected', true);"
#        rescue Capybara::NotSupportedByDriverError
#      end
      select 'None', :from => 'group[super_group_id]'
      fill_in 'group[capacity]', :with => '50'
      click_on 'Create'
      page.find_link('new test group').visible?

      begin
        page.execute_script "$('#topnav li:eq(5) a').trigger('mouseover')"
        rescue Capybara::NotSupportedByDriverError
      end
      page.find('#topnav li:eq(5) div').click_link('Contacts')
      click_on 'Groups'
      page.should have_content 'new test group'
      click_on 'logout'
      page.should have_content 'Login'
    end

    it 'should allow admin to add a contact to a group' do
      visit "/#{name}"
      page.should have_content 'Omega Non-Profit Portal'
      page.should have_content('Login')
      click_link "Login"
      fill_in "session[username]", :with => 'admin'
      fill_in "session[password]", :with => 'admin'
      click_button "Login"
      page.should_not have_content('Username or password is incorrect')
      page.should have_content('Administer Site')
      click_link 'Administer Team'

      begin
        page.execute_script "$('#topnav li:eq(5) a').trigger('mouseover')"
        rescue Capybara::NotSupportedByDriverError
      end
      page.find('#topnav li:eq(5) div a:contains("Contacts")').click
      page.should have_content 'Contacts'
      page.find_link('Perry, Katy').click
      click_on 'Group Assignments'
      page.find_link('Assign to desired groups').click
      page.should have_content 'Assigning Memerships for Katy, Perry'
      page.find('#available_groups_list div:eq(1) a').click_link('new test group')
      page.find_link('#assigned_groups_list div:eq(0) a span:eq(1):contains("new test group")').visible?
      click_on 'OK'
      page.should_not have_content 'Assigning Memerships for Katy, Perry'
      begin
        page.execute_script "$('#topnav li:eq(5) a').trigger('mouseover')"
        rescue Capybara::NotSupportedByDriverError
      end
      page.find('#topnav li:eq(5) div').click_link('Groups')
      page.find_link('new test group').click
      page.should have_content 'new test group description'
      click_on 'Members'
      page.should have_content 'Manage Members For New Test Group'
      page.find_link 'Katy, Perry'.visible?

      click_on 'logout'
      page.should have_content 'Login'
    end
  end

  describe 'import feature tests' do
    it 'should allow admin to import contacts from a CSV file' do
      visit "/#{name}"
      page.should have_content 'Omega Non-Profit Portal'
      page.should have_content('Login')
      click_link "Login"
      fill_in "session[username]", :with => 'admin'
      fill_in "session[password]", :with => 'admin'
      click_button "Login"
      page.should_not have_content('Username or password is incorrect')
      page.should have_content('Administer Site')
      click_link 'Administer Team'

      begin
        page.execute_script "$('#topnav li:eq(5) a').trigger('mouseover')"
        rescue Capybara::NotSupportedByDriverError
      end
      page.find('#topnav li:eq(5) div a:contains("Import Contacts")').click
      page.should have_content 'Import Wizard Introduction - Step (1/4)'
      click_on 'Continue'
      page.should have_content 'Import Wizard Introduction - Step (2/4)'
      page.attach_file('contact_import[csv]', 'C:\\Users\\I833606\\Documents\\a.csv')
      page.should have_content 'a.csv)'
      click_on 'Upload'
      page.should have_content 'Import Wizard Introduction - Step (3/4)'
      page.should have_content 'Taylor'
      click_on 'Continue'
      page.should have_content 'Import Wizard Introduction - Step (4/4)'

      click_on 'logout'
      page.should have_content 'Login'
    end
  end

# feature not fully implemented yet
#  describe 'reports page test' do
#    it 'should allow admin to view reports' do
#
#    end
#  end

end
