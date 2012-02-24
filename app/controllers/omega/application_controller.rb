module Omega
  class ApplicationController < ActionController::Base
	puts "\n In Omega::ApplicationController in Omega\n"
	puts "\n In Omega::ApplicationController in Omega. Defined: #{defined?(Omega::Volunteering::Position)}"
	puts "\n In Omega::ApplicationController in Omega. Defined volunteering: #{defined?(Omega::Volunteering)}"
  end
end
