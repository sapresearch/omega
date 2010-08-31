require 'trams'
require 'trams/assets/tram'
require 'trams/custom_fields/tram'
require 'trams/favorites/tram'
require 'trams/logs/tram'
require 'trams/migrations/tram'

require 'omega'
require 'accepts_flattened_values'

module Omega
  class Tram < Trams::Base
    config.omega = ActiveSupport::OrderedOptions.new

    initializer :'omega.include_mixins' do
      ActiveSupport.on_load(:action_view) do
        ActionView::Helpers::FormBuilder.send(:include, Mixins::ActionView::FormBuilderSuggestedField)
#        ActionView::Helpers::FormBuilder.send(:include, Mixins::ActionView::FormBuilderValidations)
      end
    end

    initializer :'omega.add_mime_types' do
      Mime::Type.register_alias('text/plain', :psv)
    end

    initializer :'omega.set_field_error_proc' do
      ActiveSupport.on_load(:action_view) do
        # Override the default error message layout
        ActionView::Base.field_error_proc = Proc.new { |html_tag, instance| %Q{<span class="fieldWithErrors">#{html_tag}</span>}.html_safe }
      end
    end
  end
end