require 'accepts_flattened_values'
require 'paperclip'
require 'mime/types'
require 'will_paginate'

module Omega
  class Engine < Rails::Engine
    isolate_namespace Omega

    config.omega = ActiveSupport::OrderedOptions.new

    initializer :'omega.include_mixins' do
      ActiveSupport.on_load(:action_view) do
        ActionView::Helpers::FormBuilder.send(:include, Mixins::ActionView::FormBuilderSuggestedField)
      end
    end

    initializer :'omega.add_mime_types' do
      Mime::Type.register_alias('text/plain', :psv)
      Mime::Type.register_alias('application/json', :dt)
    end

    initializer :'omega.set_field_error_proc' do
      ActiveSupport.on_load(:action_view) do
        # Override the default error message layout
        ActionView::Base.field_error_proc = Proc.new { |html_tag, instance| %Q{<span class="fieldWithErrors">#{html_tag}</span>}.html_safe }
      end
    end

    initializer :'omega.middleware' do |app|
      app.config.middleware.insert(0, Omega::FlashUploads, Rails.application.config.session_options[:key])
    end

    config.omega.assets = ActiveSupport::OrderedOptions.new
    config.omega.assets.use_dependencies = true

    #initializer :'omega.assets.middleware' do |app|
      #if Rails.env.development?
        #app.config.middleware.insert(0, Assets::Refresher, config.omega.assets)
      #else
        #Assets.refresh
      #end
    #end

  end
end
