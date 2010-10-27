module Omega
  module Errors
    module Handler
      extend ActiveSupport::Concern

      mattr_accessor :rescue_responses
      @@rescue_responses = Hash.new(:internal_server_error)
      @@rescue_responses.update({
        'ActionController::RoutingError'             => :not_found,
        'AbstractController::ActionNotFound'         => :not_found,
        'ActiveRecord::RecordNotFound'               => :not_found,
        'ActiveRecord::StaleObjectError'             => :conflict,
        'ActiveRecord::RecordInvalid'                => :unprocessable_entity,
        'ActiveRecord::RecordNotSaved'               => :unprocessable_entity,
        'ActionController::MethodNotAllowed'         => :method_not_allowed,
        'ActionController::NotImplemented'           => :not_implemented,
        'ActionController::InvalidAuthenticityToken' => :unprocessable_entity
      })

      mattr_accessor :rescue_views
      @@rescue_views = Hash.new('internal_server_error')
      @@rescue_views.update({
        'ActionController::RoutingError' => 'not_found',
        'ActiveRecord::RecordNotFound'   => 'record_not_found',
      })

      included do
        helper HandlerHelper


        rescue_from Exception, :with => :handle_error if Rails.env.production?
      end

      def inherited(base)
        super

        hide_action :not_found
      end

      def not_found
        handle_error(ActionController::RoutingError.new("No route matches #{env['PATH_INFO'].inspect}"))
      end

      private
        def handle_error(exception)
          view, status = @@rescue_views[exception.class.name], @@rescue_responses[exception.class.name]

          render "errors/#{view}", :layout => 'fallback', :status => status,
                 :locals => { :exception => exception }
        end
    end
  end
end
