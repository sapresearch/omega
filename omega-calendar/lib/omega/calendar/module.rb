module Omega
  module Calendar
    class Module < Omega::Module::Base
      config.omega.calendar = ActiveSupport::OrderedOptions.new

      observer :'calendar/model_observer'
    end
  end
end
