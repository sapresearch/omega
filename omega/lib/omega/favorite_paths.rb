module Omega
  module FavoritePaths
    PATHS = {}

    class << self
      def [](klass)
        PATHS[_normalie_klass(klass)]
      end

      def []=(klass, url_helper)
        PATHS[_normalie_klass(klass)] = url_helper
      end

      private
        def _normalie_klass(klass)
          case klass
            when String
              klass
            when Symbol, Class
              klass.to_s
            when Object
              klass.class.to_s
            else
              raise(ArgumentError, 'klass must String, Symbol, Class or Object')
          end
        end
    end
  end
end
