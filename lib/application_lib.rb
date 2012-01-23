module ApplicationLib

  require_dependency "ui_util.rb"
  include UIUtil
  
  def current_contact
    # app-spec
	return nil if current_user.is_anonymous?
    Contact.for(current_user)
    # end app-spec
  end

  def is_admin?(user=current_user)
    # app-spec
    user.roles.inject(false) { |admin, role| admin = admin == true ? true : role.internal_name == "administrator" }
    # end app-spec
  end

  def has_permission?(permission, user=current_user)
    user.has_permission?(permission)
  end
  
end