module Omega
  module Calendar
    class Tram < Trams::Base
      config.omega.calendar = ActiveSupport::OrderedOptions.new

      initializer :'omega.calendar.add_mime_types' do
        Mime::Type.register_alias('text/plain', :ics)
      end
    end
  end
end
