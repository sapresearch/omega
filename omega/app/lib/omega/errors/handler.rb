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
        'ActionController::InvalidAuthenticityToken' => :unprocessable_entity,

        'PermissionsRequiredError'                   => :unauthorized
      })

      mattr_accessor :rescue_views
      @@rescue_views = Hash.new('internal_server_error')
      @@rescue_views.update({
        'ActionController::RoutingError' => 'not_found',
        'ActiveRecord::RecordNotFound'   => 'record_not_found',

        'PermissionsRequiredError'       => 'unauthorized'
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
          log_error(exception)

          view, status = @@rescue_views[exception.class.name], @@rescue_responses[exception.class.name]

          render "errors/#{view}", :layout => 'fallback', :status => status,
                 :locals => { :exception => exception }
        end

        def log_error(exception)
          return unless logger

          ActiveSupport::Deprecation.silence do
            message = "\n#{exception.class} (#{exception.message}):\n"
            message << exception.annoted_source_code.to_s if exception.respond_to?(:annoted_source_code)
            message << "  " << application_trace(exception).join("\n  ")
            logger.fatal("#{message}\n\n")
          end
        end

        def application_trace(exception)
          clean_backtrace(exception, :silent)
        end

        def framework_trace(exception)
          clean_backtrace(exception, :noise)
        end

        def full_trace(exception)
          clean_backtrace(exception, :all)
        end

        def clean_backtrace(exception, *args)
          defined?(Rails) && Rails.respond_to?(:backtrace_cleaner) ?
            Rails.backtrace_cleaner.clean(exception.backtrace, *args) :
            exception.backtrace
        end
      
        def logger
          defined?(Rails.logger) ? Rails.logger : Logger.new($stderr)
        end
    end
  end
end
