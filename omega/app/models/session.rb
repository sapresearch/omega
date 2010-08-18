class Session < ActiveRecord::Base
  PERM_ADMIN = 'system_admin_sessions'
  PERM_VIEW  = 'system_view_sessions'
  
  self.table_name = 'user_sessions'
  
  belongs_to :user

  attr_accessor :username, :password
  attr_accessor :requested_page

  scope :enabled, :conditions => { :enabled => true }

  def authenticate
    # TODO: maybe add to errors, somehow
    @authenticated ||= (self.user = User.authenticate(username, password)) ? true : false
  end

  def authenticated?
    @authenticated ||= authenticate
  end
end
