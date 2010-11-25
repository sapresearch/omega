module Omega
  module Breadcrumbs
    extend ActiveSupport::Concern

    included do
      hide_action :breadcrumbs, :breadcrumb
    end

    module ClassMethods
      def breadcrumbs(*crumbs)
        options = crumbs.extract_options!
        crumbs << options.slice!(:only, :except, :if, :unless)
        class_eval do
          before_filter options do
            breadcrumbs(*crumbs)
          end
        end
      end
      alias breadcrumb breadcrumbs
    end

    def breadcrumbs(*crumbs)
#      options = crumbs.extract_options!
#      crumbs << options.slice!(:no_options_yet)

      @breadcrumbs ||= []

      crumbs.each do |crumb|
        @breadcrumbs.push(*_normalize_crumb(crumb))
      end

      @breadcrumbs
    end
    alias breadcrumb breadcrumbs

    private
      def _normalize_crumb(crumb)
        case crumb
          when Hash
            crumb.to_a
          when Array
            [[crumb.first, crumb.last]]
          when String
            [[crumb, crumb]]
          when Symbol
            [[crumb, send(url)]]
        end
      end
  end
end
