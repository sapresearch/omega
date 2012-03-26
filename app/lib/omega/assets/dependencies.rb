module Omega
  module Assets
    module Dependencies
      extend ActiveSupport::Concern

      TYPES = %w(stylesheet javascript)

      included do
        helper DependenciesHelper
        after_filter :_insert_dependencies, :if => :_use_dependencies?
      end

      TYPES.each do |type|
        types = type.pluralize
        class_eval <<-RUBY_EVAL, __FILE__, __LINE__ + 1
          def required_#{types}
            @_required_#{types} ||= ActiveSupport::OrderedHash.new
          end

          def required_#{types}_from_template
            @_required_#{types}_from_template ||= ActiveSupport::OrderedHash.new
          end

          def all_required_#{types}
            required_#{types}.merge(required_#{types}_from_template)
          end

          def require_#{types}(*sources)
            options = sources.extract_options!
            target = options.delete(:inside_template) ? required_#{types}_from_template : required_#{types}
            sources.each { |source| target[source] = options }
            nil
          end
          alias require_#{type} require_#{types}
        RUBY_EVAL
      end

      private
        def _use_dependencies?
          #Rails.configuration.omega.assets.use_dependencies
          Rails.configuration.assets.use_dependencies
        end

        def _insert_dependencies
          case response.content_type
            when Mime::HTML
              _insert_html_dependencies
            when Mime::JS
              _insert_javascript_dependencies
          end
        end

        def _insert_html_dependencies
          self.response_body = Array.wrap(response_body).collect do |part|
            if head = part.index('</head>') # try head first
              part.insert(head, _get_dependencies_for_html + "\n")
#            elsif body = part.index('</body>') # try body second
#              part.insert(body, _get_dependencies_for_html + "\n")
            end
            part
          end
        end

        def _insert_javascript_dependencies
          self.response_body = Array.wrap(response_body).collect do |part|
            part.insert(0, _get_dependencies_for_javascript + "\n")
          end
        end

        def _get_dependencies_for_html
          ([_get_javascript_tag('/assets/dependencies')] + TYPES.collect do |type|
            send(:"all_required_#{type.pluralize}").collect do |source, options|
              send(:"_get_#{type}_tag", *([source] << options))
            end
          end).flatten.join("\n")
        end

        def _get_javascript_tag(*args) view_context.javascript_include_tag(*args) end
        def _get_stylesheet_tag(*args) view_context.stylesheet_link_tag(*args)    end

        def _get_dependencies_for_javascript
          TYPES.collect do |type|
            send(:"all_required_#{type.pluralize}").collect do |source, options|
              path = view_context.send(:"path_to_#{type}", source)
              %Q{require_#{type}('#{path}', #{options.to_json});}
            end
          end.flatten.join("\n")
        end
    end
  end
end
