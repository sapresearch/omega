module Omega
  module CurrentUserTimeZone
    extend ActiveSupport::Concern

    included do
      before_filter :set_user_time_zone
    end

    private
      def set_user_time_zone
        Time.zone = current_user.time_zone
      end
  end
end
