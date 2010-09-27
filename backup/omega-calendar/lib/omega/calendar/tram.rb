module Omega
  module Calendar
    class Tram < Trams::Base
      config.omega.calendar = ActiveSupport::OrderedOptions.new
    end
  end
end
