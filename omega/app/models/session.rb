class Session < Omega::Model
  PERM_ADMIN = 'system_admin_sessions'
  PERM_VIEW  = 'system_view_sessions'
  
  self.table_name = 'user_sessions'
  
  belongs_to :user

  attr_accessor :username, :password, :requested_page

  scope :enabled, :conditions => { :enabled => true }

  def authenticated?
    authenticate
  end

  def authenticate
    @authenticated ||= begin
      if self.user = User.authenticate(username, password)
        true
      else
        errors['Username/password'] << 'is invalid'
        false
      end
    end
  end
end
