class UserMailer < ActionMailer::Base
  default :from => 'noreply@omegaportal.com'
  default_url_options = { :host => "myomegaportal.org", :account_name => Account.current.name }
  
  def lost_username(email, user)
    @email, @user = email, user
    mail :to => @email
  end

  def lost_password(username, user, user_token, session_url)
    @username, @user, @user_token, @session_url = username, user, user_token, session_url
    mail :to => user.email
  end
  
  def registration_confirmation(user)
    mail :to => user.email 
  end

	def volunteering_position_notice(user, record, reason)
		@user, @record, @reason = user, record, reason
		mail :to => user.mail
	end
  
  def parental_approval(user)
    @user = user
    mail :to => @user.email
  end

  def email(message)
    mail :to => message.to.email
	 mail :body => message.body
	 mail :subject => message.subject
  end
  
end
