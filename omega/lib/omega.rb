# autorequired file by rubygems/bundler

require 'active_support'
require 'rails'

module Omega
  extend ActiveSupport::Autoload

  autoload :ModuleBase

  autoload :Assets
  autoload :Migrations
  autoload :Tasks

  autoload :FavoritePaths

  autoload :Observers
  autoload :UndecoratedName

  autoload_at 'omega/routes' do
    autoload :RouteSetProxy
    autoload :Routes
  end

  autoload_under 'middleware' do
    autoload :FlashUploads
  end

  # Must be required so that when Omega-Meta loads the Omega module, the route file in Omega-Meta has access to Omega::Engine.
  require "omega/engine"

end

require 'patches/fix_5243'
require 'patches/namespaced_validators'

require 'omega/module'
