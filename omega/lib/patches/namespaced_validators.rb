# patch to be able to have namespaced validators

# should be on_load(:active_model)
ActiveSupport.on_load(:active_record) do
  class << self
    def validates(*attributes)
      defaults = attributes.extract_options!
      validations = defaults.slice!(:if, :unless, :on, :allow_blank, :allow_nil)

      raise ArgumentError, "You need to supply at least one attribute" if attributes.empty?
      raise ArgumentError, "Attribute names must be symbols" if attributes.any?{ |attribute| !attribute.is_a?(Symbol) }
      raise ArgumentError, "You need to supply at least one validation" if validations.empty?

      defaults.merge!(:attributes => attributes)

      validations.each do |key, options|
        begin
          validator = const_get("#{key.to_s.camelize}Validator")
        rescue NameError
          begin
            validator = "#{key.to_s.camelize}Validator".constantize
          rescue NameError
            raise ArgumentError, "Unknown validator: '#{key}'"
          end
        end

        validates_with(validator, defaults.merge(_parse_validates_options(options)))
      end
    end
  end
end
