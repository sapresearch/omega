module Omega
  module Calendar
    class Tram < Trams::Base
      config.omega.calendar = ActiveSupport::OrderedOptions.new

      initializer :'omega.calendar.add_icalendar_date_format' do
        Time::DATE_FORMATS[:icalendar] = '%Y%m%dT%H%M%SU'
      end
    end
  end
end
