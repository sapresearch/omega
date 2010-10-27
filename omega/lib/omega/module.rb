require 'accepts_flattened_values'
require 'will_paginate'

require 'omega'

module Omega
  class Module < ModuleBase
    Base = Omega::ModuleBase
    
    config.omega = ActiveSupport::OrderedOptions.new

    initializer :'omega.include_mixins' do
      ActiveSupport.on_load(:action_view) do
        ActionView::Helpers::FormBuilder.send(:include, Mixins::ActionView::FormBuilderSuggestedField)
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

    config.omega.assets = ActiveSupport::OrderedOptions.new
    config.omega.assets.use_dependencies = true

    initializer :'omega.assets.middleware' do |app|
      if Rails.env.development?
        app.config.middleware.insert(0, Assets::Refresher, config.omega.assets)
      else
        Assets.refresh
      end
    end

#    initializer :'omega.errors.middleware' do |app|
#      middleware = app.config.middleware
#
#      unless Rails.env.test?
#        middleware.swap(ActionDispatch::ShowExceptions, Omega::HandleErrors)
#      end
#    end
  end
end
