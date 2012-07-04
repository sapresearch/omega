require 'spec_helper'

def create_account(name)
		account = Account.new(name: name)
		roles, permissions = account.build_roles_and_permissions
		account.save
		Account.current = account
		account.assign_roles_and_permissions(roles, permissions)
		account.build_setting('test@test.com')
		account
end

describe "AccountPageTests" do
  describe "account page", :type => :request do
#    it "displays the account page properly" do
#      get '/accounts'
#      response.body.should include('Omega Accounts Portal')
#    end
#    before :each do
#      Account.make(:name => 'Montreal', :create_at => '2012-05-25 15:10:38', :updated_at => '2012-05-25 15:10:38')
#    end
#    it 'displays the account registration form' do
#      visit '/accounts'
#      click_link 'New Account'
#      page.should have_content('New account')
#      fill_in "account_name", :with => 'montreal'
#      fill_in "user_username", :with => 'admin'
#      fill_in "user_password", :with => 'admin'
#      fill_in "user_password_confirmation", :with => 'admin'
#      fill_in 'user_email', :with => 'parvez@gmail.com'
#      click_button 'create'
#      response.should redirect_to('/accounts')
#      current_path.should == '/accounts'
#      page.should have_content('Account was successfully created.')
#      include('Account was successfully created.')
#    end
#    it 'displays the first account that was created' do
#      visit '/accounts'
##      page.should have_content('Account was successfully created.')
#      page.should have_content('montreal')
#    end
  end
end
