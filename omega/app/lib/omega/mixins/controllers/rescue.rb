module Omega::Mixins::Controllers::Rescue
  extend ActiveSupport::Concern

  included do
    rescue_from Exception, :with => :rescue_exception
  end

  private
    def rescue_exception
      
    end
end
