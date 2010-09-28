module Omega
  module Calendar
    class Tram < Trams::Base
      config.omega.calendar = ActiveSupport::OrderedOptions.new

      initializer :'omega.calendar.add_mime_types' do
        Mime::Type.register_alias('text/plain', :ics)
      end

      initializer :'omega.calendar.add_icalendar_date_format' do
        Time::DATE_FORMATS[:icalendar] = '%Y%m%dT%H%M%SU'
      end
    end
  end
end
