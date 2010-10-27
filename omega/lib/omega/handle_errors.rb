module Omega
  class HandleErrors
    def initialize(app, options = {})
      @app, @options = app, options
    end

    def call(env)
      status, headers, body = @app.call(env)

      if headers['X-Cascade'] == 'pass'
        raise ActionController::RoutingError, "No route matches #{env['PATH_INFO'].inspect}"
      end

      [status, headers, body]
    rescue Exception => exception
      
    end



#    included do
      # can't actually rescue RoutingError, '*url' route is defined instead
#      rescue_from ActionController::RoutingError, :with => :not_found
#      rescue_from ActiveRecord::RecordNotFound,   :with => :record_not_found
#      rescue_from Exception,                      :with => :server_error
#      rescue_from Exception do |exception|
#        ErrorController.action(:server_error).call(env)
#  #      render :text => 'wtf'
#      end
#    end

#    def inherited(base)
#      super
#
#      hide_action :not_found
#      hide_action :record_not_found
#      hide_action :server_error
#    end
#
#    def not_found
#      render 'error/not_found', :status => :not_found
#    end
#
#    def record_not_found
#      render 'error/record_not_found', :status => :not_found
#    end
#
#    def server_error
#      render 'error/server_error', :status => :server_error
#    end
  end
end
