class UserMailer < ActionMailer::Base
  default :from => "from@example.com"

  def lost_username(email, users)
    @email, @users = email, users

    mail :to => @email
  end

  def lost_password(username, user, user_token, session_url)
    @username, @user, @user_token, @session_url = username, user, user_token, session_url

    mail :to => user.email
  end
  
  def registration_confirmation(email)
    mail :to => email, :subject => "Evergreen Registration Confirmation", :from => "admin@evegreen.omegaportal.org" 
    
  end
end
