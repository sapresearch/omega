module Omega
  module Contacts
    class Module < Omega::Module::Base
      config.omega.contacts = ActiveSupport::OrderedOptions.new
      
      observer :'contact/user_observer'
    end
  end
end

