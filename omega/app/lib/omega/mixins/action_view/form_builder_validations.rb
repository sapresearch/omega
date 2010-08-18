module Omega::Mixins
  module ActionView
    module FormBuilderValidations
      extend ActiveSupport::Concern

      included do
        (field_helpers - %w(hidden_field fields_for apply_form_for_options! label)).each do |selector|
          class_eval <<-RUBY_EVAL, __FILE__, __LINE__ + 1
            def #{selector}_with_validations(method, options = {})
              add_validations!(method, options)
              #{selector}_without_validations(method, options)
            end
          RUBY_EVAL
          alias_method_chain selector, :validations
        end

        %w(select collection_select grouped_collection_select time_zone_select).each do |selector|
          class_eval <<-RUBY_EVAL, __FILE__, __LINE__ + 1
            def #{selector}_with_validations(method, choices, options = {}, html_options = {})
              add_validations!(method, html_options)
              #{selector}_without_validations(method, choices, options, html_options)
            end
          RUBY_EVAL
          alias_method_chain selector, :validations
        end
      end

      def add_validations!(method, options = {})
        klass = @object.class
        method_validators = klass.validators.select { |v| v.attributes.include?(method) }

        validators = []

        method_validators.each do |validator|
          validator_name    = validator_name(validator)
          validator_options = validator.options.dup
          validator_options.delete(:tokenizer)

          validators << { validator_name => validator_options }
        end

        options[:'data-validations'] = validators.to_json unless validators.empty?
      end

      private
        def validator_name(validator)
          validator.class.to_s.
            gsub(/Validator$/, '').
            demodulize.
            underscore
        end
    end
  end
end
