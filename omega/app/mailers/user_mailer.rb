class UserMailer < ActionMailer::Base
  default :from => "from@example.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.lost_username.subject
  #
  def lost_username(email, users)
    @email = email
    @users = users

    mail :to => @email
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.lost_password.subject
  #
  def lost_password
    @greeting = "Hi"

    mail :to => "to@example.org"
  end
end
