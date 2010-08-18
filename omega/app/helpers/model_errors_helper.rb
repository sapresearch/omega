module ModelErrorsHelper
  def errors_for_model(model, title = nil)
    title ||= model.class.model_name.human
    
    if model.errors.any?
      render :partial => 'shared/model_errors', :locals => { :errors => model.errors, :title => title }
    else
      ''
    end
  end

  alias_method :errors_for_form, :errors_for_model # can change how forms show errors in the future
end
