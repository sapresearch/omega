require 'fileutils'

module Omega
  module Assets
    class Refresher
      def initialize(app, options = {})
        @app, @options = app, options
      end

      def call(env)
        dup._call(env)
      end

      def _call(env)
        Assets.refresh
        @app.call(env)
      end
    end
  end
end