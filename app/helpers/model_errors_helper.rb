module ModelErrorsHelper
  def errors_for_model(model, title = nil)
    title ||= model.class.model_name.human
    
    if model.errors.any?
      render :partial => 'shared/model_errors', :locals => { :errors => model.errors, :title => title }
    else
      ''
    end
  end

  def errors_for_user_registration(user,contact)
  
    
    if user.errors.any? || contact.errors.any?
      render :partial => 'shared/registration_form_errors', :locals => { :user_errors => user.errors, :contact_errors => contact.errors }
    else
      ''
    end
  end
  
  alias_method :errors_for_form, :errors_for_model # can change how forms show errors in the future
end
