class Contact::UserObserver < ActiveRecord::Observer
  observe :user

  def after_update(user)
    puts "after_update(#{user})"
  end
end
