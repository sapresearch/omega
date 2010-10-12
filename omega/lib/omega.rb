# autorequired file by rubygems/bundler

module Omega
  extend ActiveSupport::Autoload

  autoload :Assets
  autoload :Migrations
end

require 'omega/tram'
