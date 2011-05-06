module Omega
  module Reports
    class Module < Omega::Module::Base
      config.omega.reports = ActiveSupport::OrderedOptions.new
    end
  end
end
