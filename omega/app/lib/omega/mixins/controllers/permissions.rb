module Omega::Mixins::Controllers
  module Permissions
    extend ActiveSupport::Concern

    module ClassMethods
      def require_permission(*permissions)
        options = permissions.extract_options!
        class_eval do
          before_filter options do
            require_permission(*permissions)
          end
        end
      end
    end
    
    def require_permission(*permissions)
      permissions.each do |permission|
        unless current_user.has_permission?(permission)
          if current_user.is_logged_in?
            raise PermissionRequiredError.new(permission, params)
          else
            flash[:message] = 'Please log in to continue'
            session[:requested_page] = params
            redirect_to(new_session_url)
          end
        end
      end
    end
  end
end

class PermissionRequiredError < StandardError
  attr_reader :params, :permission

  def initialize(params, permission)
    @params, @permission = params, permission
    super("Access denied")
  end
end