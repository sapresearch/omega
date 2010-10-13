module Omega
  class RouteSetProxy
    PROXY_CLASS = ActionDispatch::Routing::RouteSet

    attr_reader :route_set

    class << self
      delegate *(PROXY_CLASS.methods - methods << { :to => PROXY_CLASS })
    end
    
    delegate *(PROXY_CLASS.instance_methods - instance_methods << { :to => :route_set })

    def initialize(route_set)
      unless route_set.is_a?(PROXY_CLASS)
        raise ArgumentError, "can only proxy a #{PROXY_CLASS} instance"
      end

      @route_set = route_set
    end
  end

  module Routes
    extend ActiveSupport::Concern

    module ClassMethods
      def routes
        @_route_set_proxy ||= RouteSetProxy.new(Rails.application.routes)
      end
    end
  end
end