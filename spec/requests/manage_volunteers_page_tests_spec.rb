#require 'spec_helper'
#
#def create_account(name)
#		account = Account.new(name: name)
#		roles, permissions = account.build_roles_and_permissions
#		account.save
#		Account.current = account
#		account.assign_roles_and_permissions(roles, permissions)
#		account.build_setting('admin@test.com')
#		account.save!
#    account
#end
#
#def create_volunteer(name)
#  volunteer = User.new()
#end
#
#def create_admin(account)
#  params = {user: { email: 'admin@test.com', password: 'admin', password_confirmation: 'admin', username: 'admin' } }
#  admin = account.build_admin(params)
#  account.save!
#  Account.current = account
#  admin.update_attribute(:account_id, account.id)
#  admin.save
##  account.save
#  admin
#end
#
#describe "VolunteerPageTests" do
#
#  name = 'montreal'
#  account = create_account(name)
#  before :each do
#    account.save
#    Account.current = account
#    account.should be_valid
#    Account.find_by_name(name).should_not be_nil
#
#    roles = Role::DEFAULT_ROLES.count
#    account.roles.count.should eq(roles)
#    perms = Permission::DEFAULT_PERMISSIONS.count
#    account.permissions.count.should eq(perms)
#    Account.current=(account)
#  end
#
#  describe "GET /volunteer_page_tests" do
#
##    it "displays the home page and tries to visit the volunteer page" do
##      visit "/#{name}"
##      page.should have_content('Login')
##      visit "/#{name}/volunteering/positions"
##      page.should have_content('Please log in first.')
##    end
#
##    it "displays the account home page and tries to create an admin account" do
##      visit "/accounts"
##      page.should have_content('Listing accounts')
##      click_on 'New Account'
##      page.should have_content('New account')
##
##      fill_in 'account[name]', :with => "#{name}"
##      fill_in 'user[username]', :with => 'admin'
##      fill_in 'user[password]', :with => 'admin'
##      fill_in 'user[password_confirmation]', :with => 'admin'
##      fill_in 'user[email]', :with => 'admin@test.com'
##      click_on 'Create'
##
##      page.should have_content('Account was successfully created.')
##      visit "/#{name}"
##      page.should have_content('Login')
##    end
##
#
##
##    it 'displays the sign in prompt and tries to sign in and then sign out' do
##      visit "/#{name}"
##      page.should have_content('Login')
##      click_link "Login"
##      fill_in "session[username]", :with => 'bob'
##      fill_in "session[password]", :with => 'smith123'
##      click_button "Login"
##      page.should_not have_content('Username or password is incorrect')
##      page.should have_content('Messages')
##      click_on "logout"
###      @selenium.assertConfirmation('Are you sure?') # does not work
##      page.driver.browser.switch_to.alert.accept # capybara supports this method
##      page.should have_content('Login')
##    end
#
#    it 'should be able to allow administrator to log in and create a new volunteering activity' do
#      admin = create_admin(account)
#      admin.account_id.should eq(account.id)
#      admin.username.should eq('admin')
##      puts User.first.inspect
#      visit "/#{name}"
#      page.should have_content('Login')
#      click_link "Login"
#      fill_in "session[username]", :with => 'admin'
#      fill_in "session[password]", :with => 'admin'
#      click_button "Login"
#      page.should_not have_content('Username or password is incorrect')
#      page.should have_content('Administer Site')
#      wait_until { page.has_selector? "#topnav li:eq(3) a" }
#      begin
#        page.execute_script "$('#topnav li:eq(3) a').trigger('mouseover')"
##        page.execute_script "$('#topnav li:eq(3) a div a:eq(1)').trigger('click')"
#        rescue Capybara::NotSupportedByDriverError
#      end
##      page.should visible?('Create an Assignment')
##      page.should has_link?('Create an Assignment')
#      click_link('Create an Assignment')
#      fill_in "volunteering_position[name]", :with => 'test assignment 1'
#      fill_in "volunteering_position[description]", :with => 'mow lawn, paint fence'
#      fill_in "volunteering_position[volunteers_required]", :with => '4'
#      choose 'volunteering_position_priority_normal'
#      choose 'volunteering_position_priority_high'
##      page.find('#volunteering_position_start_date')
##      begin
##        page.execute_script "$('#volunteering_position_start_date').trigger('mousedown')"
##        rescue Capybara::NotSupportedByDriverError
##      end
#      fill_in 'volunteering_position[start_date]', :with => '2012-06-14'
#      choose 'contact_assignment_new'
#
##      select 'volunteering_position[contacts_attributes][0][title]', :value => 'Mr'
#      fill_in "volunteering_position[contacts_attributes][0][first_name]", :with => 'Bob'
#      fill_in "volunteering_position[contacts_attributes][0][last_name]", :with => 'Smith'
#      fill_in "volunteering_position[contacts_attributes][0][email]", :with => 'bob.smith@test.com'
##      select 'volunteering_position_contacts_attributes_0_phone_numbers_attributes_0_number_type', :with => 'Cell'
#      fill_in "volunteering_position[contacts_attributes][0][phone_numbers_attributes][0][number]", :with => '123 456 7890'
#
#      fill_in "volunteering_position[skills_values]", :with => 'gardening'
##      fill_in "volunteering_position[interests_values]", :with => ''
#      fill_in "volunteering_position[agreement]", :with => ''
#      choose 'volunteering_position_disclaimer_agreement_false'
#      click_on "Create"
#      page.should have_content('test assignment 1')
#      click_on 'logout'
#      page.driver.browser.switch_to.alert.accept
#      page.should have_content('Login')
#    end
#
#    it 'displays the user registration form and attempts to register' do
#      visit "/#{name}/users/register"
#      page.should have_content('Registration')
#      fill_in "user[contact_attributes][first_name]", :with => 'Bob'
#      fill_in "user[contact_attributes][last_name]", :with => 'Smith'
#      fill_in "user[contact_attributes][birthday]", :with => '01/01/2000'
#      fill_in "user[contact_attributes][addresses_attributes][0][city]", :with => 'Montreal'
#      fill_in 'user[contact_attributes][addresses_attributes][0][zip_code]', :with => 'V5T1L5'
#      fill_in 'user[contact_attributes][phone_numbers_attributes][0][number]', :with => '213 213-5465'
#      fill_in 'user[contact_attributes][email]', :with => 'bob.smith@mail.com'
#      fill_in 'user[contact_attributes][email_confirmation]', :with => 'bob.smith@mail.com'
#      fill_in 'user[username]', :with => 'bob'
#      fill_in 'user[password]', :with => 'smith123'
#      fill_in 'user[password_confirmation]', :with => 'smith123'
#      click_button 'REGISTER'
#      page.should have_content('Hello Bob!')
#    end
#
#    it 'should be able to log in as regular user and check for a volunteering activity' do
#      visit "/#{name}"
#      page.should have_content('Login')
#      click_link "Login"
#      fill_in "session[username]", :with => 'bob'
#      fill_in "session[password]", :with => 'smith123'
#      click_button "Login"
#      page.should_not have_content('Username or password is incorrect')
#      page.should_not have_content('Administer Site')
##      page.should have_content('Logout')
#      begin
#        page.execute_script "$('#topnav li:eq(1) a').trigger('mouseover')"
#        rescue Capybara::NotSupportedByDriverError
#      end
#      click_link 'Volunteer'
#      page.should have_content('test assignment 1')
#      click_link 'Apply'
#      page.should have_content(' Apply for test assignment 1 ')
#      click_on 'Create'
#      page.should have_content('Applicant Information')
#      page.should have_content('Volunteering History')
#      click_link 'logout'
#      page.driver.browser.switch_to.alert.accept # capybara supports this method
#      page.should have_content('Login')
#    end
#
#    it 'should allow adming to login and approve a volunteer application' do
#      admin = create_admin(account)
#      admin.account_id.should eq(account.id)
#      admin.username.should eq('admin')
#
#      visit "/#{name}"
#      page.should have_content('Login')
#      click_link "Login"
#      fill_in "session[username]", :with => 'admin'
#      fill_in "session[password]", :with => 'admin'
#      click_button "Login"
#      page.should_not have_content('Username or password is incorrect')
#      page.should have_content('Administer Site')
#      wait_until { page.has_selector? "#topnav li:eq(3) a" }
#      begin
#        page.execute_script "$('#topnav li:eq(3) a').trigger('mouseover')"
#        rescue Capybara::NotSupportedByDriverError
#      end
#      click_link('Manage Applicants')
#      page.should have_content('Bob Smith')
#      page.should have_content('See Application')
#      click_link('See Application')
#      page.should have_content('test assignment 1')
#      click_link('Take Action Now!')
#      page.should have_content('Administer Application')
#      choose 'volunteering_record_action_accepted'
#      click_on('Save')
#      click_link 'Volunteering Applications'
#      page.should have_content('Bob Smith')
#      page.should have_content('Accepted')
#      click_link 'logout'
#    end
#
#  end
#end
