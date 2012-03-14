module Omega
  class Module
    class Configuration < Rails::Engine::Configuration
      def initialize(*)
        super
      end
    end
  end
end
