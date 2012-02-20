class UserMailer < ActionMailer::Base
  default :from => Omega::Setting.default_email
  default_url_options = { :host => "omega.com" }
  
  def lost_username(email, users)
    @email, @users = email, users
    mail :to => @email
  end

  def lost_password(username, user, user_token, session_url)
    @username, @user, @user_token, @session_url = username, user, user_token, session_url
    mail :to => user.email
  end
  
  def registration_confirmation(user)
    mail :to => user.email 
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
