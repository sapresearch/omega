module Omega
  module Observers
    extend ActiveSupport::Concern

    module ClassMethods
      def observer(name)
        observers(name)
      end

      def observers(*names)
        config.active_record.observers ||= []
        config.active_record.observers.concat(names)
      end
    end
  end
end