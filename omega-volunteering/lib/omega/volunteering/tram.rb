module Omega
  module Volunteering
    class Tram < Trams::Base
      config.omega.volunteering = ActiveSupport::OrderedOptions.new
    end
  end
end
