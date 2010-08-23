module Omega
  module Contacts
    class Tram < Trams::Base
      config.omega.contacts = ActiveSupport::OrderedOptions.new
      
      observer :'contact/user_observer'
    end
  end
end
