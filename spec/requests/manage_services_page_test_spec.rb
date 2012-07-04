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

#def create_user(account)
#  Account.current = account
#  params = {
#              user: {
#                contact_attributes: {
#                  first_name: 'Bob',
#                  last_name: 'Smith',
#                  birthday: '01/01/1989',
#                  over_18: '1',
#                  address_attributes: {
#                    city: 'Montreal',
#                    zip_code: '123456',
#                    number: '321 456 9876'
#                  },
#                  email: 'bob.smith@test.com',
#                  email_confirmation: 'bob.smith@test.com',
#                  username: 'bob',
#                  password: 'smith123',
#                  password_confirmation: 'smith123'
#                }
#              }
#            }
#
#  password = params[:user].delete(:password)
#  confirm = params[:user].delete(:password_confirmation)
#  unless params[:user][:contact_attributes][:birthday].empty?
#    params[:user][:contact_attributes][:birthday] = Date.strptime(params[:user][:contact_attributes][:birthday], '%m/%d/%Y')
#  end
#
#  user = User.new(params[:user])
#  user.account = account
#  user.password = password
#  user.password_confirmation = confirm
#  user.save
#  user
#end

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

  describe "GET manager services page" do

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

    it 'should allow admin to create new service and publish it' do
      visit "/#{name}"
      page.should have_content 'Omega Non-Profit Portal'
      page.should have_content('Login')
      click_link "Login"
      fill_in "session[username]", :with => 'admin'
      fill_in "session[password]", :with => 'admin'
      click_button "Login"
      page.should_not have_content('Username or password is incorrect')
      page.should have_content('Administer Site')
      click_link 'Manage Services'
      page.should have_content 'All Offered Services'
      page.should have_content 'No service is being offered at the moment based on the filter settings.'
      click_on 'New'
      choose 'service_leaf_level_radio'
      fill_in 'service[name]', :with => 'test service 1'
      fill_in 'service[description]', :with => 'description of test service 1'
#      select option from dropdown menu for 'register type'
      begin
        page.execute_script "$('#service_register_type option').filter(function() { return $(this).text() == 'Requestable'; }).attr('selected', true);"
        rescue Capybara::NotSupportedByDriverError
      end

      fill_in 'service_capacity', :with => '20'
      fill_in 'service_price', :with => '19.59'

      click_link 'Edit'
      page.find('#service_sections_0_contact_id').visible?
      begin
        page.execute_script "$('#service_sections_0_contact_id option').filter(function() { return $(this).text() == 'Bob, Smith'; }).attr('selected', true);"
        rescue Capybara::NotSupportedByDriverError
      end
      fill_in 'service_sections[0][location]', :with => 'Montreal'
      fill_in 'service_sections_0_start_at', :with => '2010-06-15 13:07'
      fill_in 'service_sections_0_end_at', :with => '2010-06-15 13:07'
      click_on 'Preview'
      page.should have_content 'Montreal'

      page.find('#service_customization_info h3 span span').click_link('Edit')
      page.should have_content 'Service Detail'
      page.find('#service_registration_tab_link').click
      page.find('#check_service_detail_template').visible?
      click_on 'Text Field'
      begin
        page.execute_script "$('#table_div_2 ul li').trigger('mouseover')"
        rescue Capybara::NotSupportedByDriverError
      end
      page.find('#table_div_2 ul li div div span:eq(1)').visible?
      begin
        page.execute_script "$('#table_div_2 ul li div div span:eq(1)').trigger('click')"
        rescue Capybara::NotSupportedByDriverError
      end
      page.should have_content 'Field Required?'
      fill_in 'text_field_edit_label', :with => 'Test text field'
      fill_in 'field_length_lower_bound', :with => '3'
      fill_in 'field_length_upper_bound', :with => '8'
#      click_on 'Text Area'
#      click_on 'Select List'
#      click_on 'Date'


      click_on 'Create and Publish'
      page.should have_content 'test service 1'
      page.should have_content 'Register'
      visit "/#{name}"
      page.should have_content 'Omega Non-Profit Portal'
      page.should have_content 'test service 1'
      click_on "logout"
      page.driver.browser.switch_to.alert.accept # capybara supports this method
      page.should have_content('Login')
    end

    it 'should allow admin to create new service-category and publish it' do
      visit "/#{name}"
      page.should have_content 'Omega Non-Profit Portal'
      page.should have_content('Login')
      click_link "Login"
      fill_in "session[username]", :with => 'admin'
      fill_in "session[password]", :with => 'admin'
      click_button "Login"
      page.should_not have_content('Username or password is incorrect')
      page.should have_content('Administer Site')
      click_link 'Manage Services'
      page.should have_content 'All Offered Services'
#      page.should_not have_content 'No service is being offered at the moment based on the filter settings.'
      click_on 'New Category'
      choose 'service_branch_level_radio'
      fill_in 'service[name]', :with => 'test service category 1'
      fill_in 'service[description]', :with => 'description of test service category 1'
      #      select option from dropdown menu for 'belongs to'
      begin
        page.execute_script "$('#service_super_service_id option').filter(function() { return $(this).text() == 'New Service Category'; }).attr('selected', true);"
        rescue Capybara::NotSupportedByDriverError
      end
#      page.should have_content 'Creating New Service Category In New Service Category'
  #    click_link 'Edit'
  #    page.should have_content 'Section 1'
      click_on 'Create and Publish'
      page.should have_content 'test service category 1'
      visit "/#{name}"
      page.should have_content 'Omega Non-Profit Portal'
      begin
        page.execute_script "$('#topnav li:eq(4) a').trigger('mouseover')"
        rescue Capybara::NotSupportedByDriverError
      end
      click_on 'test service category 1'
      page.should have_content 'test service category 1'
      click_on "logout"
      page.driver.browser.switch_to.alert.accept # capybara supports this method
      page.should have_content('Login')
    end

#    it 'should allow admin to allocate assets and services' do
##      not possible at t his point
#    end

  end

end