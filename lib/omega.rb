# autorequired file by rubygems/bundler

require 'active_support'
require 'rails'

module Omega
  extend ActiveSupport::Autoload

  autoload :FavoritePaths

  autoload :Observers
  autoload :UndecoratedName

  autoload_under 'middleware' do
    autoload :FlashUploads
  end
end

require 'patches/fix_5243'
require 'patches/namespaced_validators'

require 'omega/module'
