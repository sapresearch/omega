module Omega
  module UndecoratedName
    extend ActiveSupport::Concern

    module ClassMethods
      def undecorated_name(tram = self)
        tram.to_s.gsub(/::Module$/, '')
      end
    end

    def undecorated_name
      self.class.undecorated_name
    end
  end
end