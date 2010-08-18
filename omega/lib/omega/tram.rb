require 'trams'
require 'trams/assets/tram'
require 'trams/custom-fields/tram'
require 'trams/files/tram'
require 'trams/locales/tram'
require 'trams/logs/tram'
require 'trams/migrations/tram'
require 'trams/settings/tram'

require 'omega'
require 'accepts_flattened_values'

module Omega
  class Tram < Trams::Base
    initializer :'omega.include_mixins' do
      ActiveSupport.on_load(:action_view) do
        ActionView::Helpers::FormBuilder.send(:include, Mixins::ActionView::FormBuilderSuggestedField)
        ActionView::Helpers::FormBuilder.send(:include, Mixins::ActionView::FormBuilderValidations)
      end
    end
  end
end
