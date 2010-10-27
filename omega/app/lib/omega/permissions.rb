module Omega
  module Permissions
    extend ActiveSupport::Concern

    included do
      hide_action :require_permissions, :require_permission
    end

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
    
    def require_permissions(*permissions)
      unless (lacked_permissions = permissions.reject { |p| current_user.has_permission?(p) }).empty?
        raise PermissionsRequiredError.new(lacked_permissions, params)
      end

#      permissions.each do |permission|
#        unless current_user.has_permission?(permission)
#          if current_user.is_logged_in?
#            raise PermissionRequiredError.new(permission, params)
#          else
#            flash[:message] = 'Please log in to continue'
#            session[:requested_page] = params
#            redirect_to(new_session_url)
#          end
#        end
#      end
    end
    alias require_permission require_permissions
  end
end

class PermissionsRequiredError < StandardError
  attr_reader :params, :permissions

  def initialize(params, permissions)
    @params, @permissions = params, permissions
    super("Access denied")
  end
end