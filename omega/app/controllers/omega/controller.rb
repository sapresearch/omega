module Omega
  class Controller < ActionController::Base
    include Omega::Errors::Handler

    include Omega::Assets::Dependencies

    include Omega::Breadcrumbs
    include Omega::CurrentUser
    include Omega::CurrentUserTimeZone
#    include Omega::Crud
    include Omega::Permissions
    include Omega::SubLayouts

    include Omega::Mixins::Controllers::Crud

  #  self.responder = Omega::ControllerResponder

    protect_from_forgery

    layout 'application'

    breadcrumb 'Omega' => :root
  end
end