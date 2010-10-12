module Omega
  module Assets
    module DependenciesHelper
      extend ActiveSupport::Concern

      Dependencies::TYPES.each do |type|
        types = type.pluralize
        class_eval <<-RUBY_EVAL, __FILE__, __LINE__ + 1
          def require_#{types}(*sources)
            options = sources.extract_options!
            controller.send(:require_#{types}, *(sources << options.merge(:inside_template => inside_template?)))
            nil
          end
          alias require_#{type} require_#{types}
        RUBY_EVAL
      end

      def inside_template?
        @inside_template == true
      end

      def _render_layout(*)
        old_inside_template, @inside_template = @inside_template, false
        super
      ensure
        @inside_template = old_inside_template
      end

      def _render_template(*)
        old_inside_template, @inside_template = @inside_template, true
        super
      ensure
        @inside_template = old_inside_template
      end
    end
  end
end
