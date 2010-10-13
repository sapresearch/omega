module Omega
  class Module
    module Configurable
      def self.included(base)
        base.extend ClassMethods
      end

      module ClassMethods
        delegate :middleware, :root, :paths, :to => :config

        def config
          @config ||= Trams::Base::Configuration.new(find_root_with_flag("lib"))
        end

        def inherited(base)
          raise "You cannot inherit from a Omega::Module child"
        end
      end

      def config
        self.class.config
      end
    end
  end
end