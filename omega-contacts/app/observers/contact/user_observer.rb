class Contact::UserObserver < ActiveRecord::Observer
  observe :user

  def after_update(user)
    unless Contact.for(user)
      Contact.new do |c|
        c.user = user
      end.save(:validate => false)
    end
  end
end
