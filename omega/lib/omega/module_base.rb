module Omega
  Rails::Railtie::ABSTRACT_RAILTIES << 'Omega::ModuleBase' << 'Omega::Module::Base'

  class ModuleBase < Rails::Engine
    extend ActiveSupport::Autoload

    autoload :Configurable
    autoload :Configuration

    class << self
      def inherited(child)
        super

        unless child.abstract_railtie?
          # we need to find the directory of the file that inherited us
          # rails uses this to determine the root of an engine for its paths
          call_stack = caller.map { |p| p.split(':')[0..-2].join(':') }
          child.called_from = File.dirname(call_stack.detect { |p| p !~ %r[omega[\w\-\.]*/lib/omega/module_base] })

          # add each tram to Rails::Engine.subclasses so it will be loaded as one in rails
          Rails::Engine.subclasses << child
        end
      end
    end

    # MUST go after 'action_controller.set_configs' because it calls helpers_path = [...] which would clear our helpers
    initializer :'omega.module_base.add_helper_paths', :after => 'action_controller.set_configs' do
      helpers = paths.app.helpers.to_a
      ActiveSupport.on_load(:action_controller) do
        helpers_path.concat(helpers)
      end
    end
  end

  ModuleBase.class_eval do
    include Observers
    include Routes
    include UndecoratedName
  end
end
