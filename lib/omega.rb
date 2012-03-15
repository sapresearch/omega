# autorequired file by rubygems/bundler

require 'active_support'
require 'rails'

module Omega
  extend ActiveSupport::Autoload

  autoload :FavoritePaths

  autoload :Observers
  autoload :UndecoratedName
	require 'table_name_space'

  autoload_under 'middleware' do
    autoload :FlashUploads
  end
end

require 'patches/fix_5243'
require 'patches/namespaced_validators'

require 'omega/engine'
require 'omega/module'

