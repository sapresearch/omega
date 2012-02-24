module Omega
  class Controller < ApplicationController
	puts "\n In Omega::Controller in Omega\n"
	puts "\n In Omega::Controller in Omega. Defined: #{defined?(Omega::Volunteering::Position)}"
	puts "\n In Omega::Controller in Omega. Defined volunteering: #{defined?(Omega::Volunteering)}"
 #    include Omega::Errors::Handler

 #   include Omega::Assets::Dependencies

    include Omega::Breadcrumbs
    include Omega::CurrentUser
  ##  include Omega::CurrentUserTimeZone
#    include Omega::Crud
    include Omega::Permissions
 ##   include Omega::SubLayouts

 #   include Omega::Mixins::Controllers::Crud

  #  self.responder = Omega::ControllerResponder

    protect_from_forgery

    layout 'omega/application'

    ##breadcrumb 'Omega' => :root
  end
end
