require 'omega/tram'

module Omega
  module Contacts
    class Tram < Trams::Base
      observers :'contact/user_observer'
    end
  end
end
