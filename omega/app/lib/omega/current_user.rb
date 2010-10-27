module Omega
  module CurrentUser
    extend ActiveSupport::Concern

    included do
      before_filter :get_current_user

      hide_action :current_user
    end

    def current_user
      @current_user
    end

    protected
      def clear_current_user
        reset_session
        @current_user = nil
      end

    private
      def get_current_user
        @current_user = begin
          if session[:user_id]
            validate_session
          else
            User.anonymous
          end
        end
      end

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