module Omega::Mixins::Controllers
  module CurrentUser
    extend ActiveSupport::Concern

    included do
      
    end

    def current_user
      @current_user ||= begin
        if session[:user_id]
          validate_session
        else
          User.anonymous
        end
      end
    end

    protected
      def clear_current_user
        reset_session
        @current_user = nil
      end

    private
      def validate_session
        user = User.find_by_id(session[:user_id])

        unless user
          clear_current_user
          flash[:message] = 'This sessions is no longer valid. Please log in again.'
          redirect_to new_session_url
        end
        # TODO: timeout validation

        user
      end
  end
end