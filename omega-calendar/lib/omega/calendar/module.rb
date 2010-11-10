module Omega
  module Calendar
    class Module < Omega::Module::Base
      config.omega.calendar = ActiveSupport::OrderedOptions.new
    end
  end
end
