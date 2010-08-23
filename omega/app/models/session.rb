class Session < ActiveRecord::Base
  PERM_ADMIN = 'system_admin_sessions'
  PERM_VIEW  = 'system_view_sessions'
  
  self.table_name = 'user_sessions'
  
  belongs_to :user

  attr_accessor :username, :password

  scope :enabled, :conditions => { :enabled => true }

  def authenticate
    unless self.user = User.authenticate(username, password)
      errors['Username/password'] << 'is invalid'
    end
    user
  end
end
