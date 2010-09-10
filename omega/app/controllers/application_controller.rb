class ApplicationController < ActionController::Base
  include Omega::Mixins::Controllers::Breadcrumbs
  include Omega::Mixins::Controllers::Crud
  include Omega::Mixins::Controllers::CurrentUser
  include Omega::Mixins::Controllers::Permissions
  include Omega::Mixins::Controllers::SubLayouts

  include Trams::Assets::Dependencies
  
  self.responder = Omega::ApplicationResponder

  protect_from_forgery
  layout 'application'

  breadcrumb 'Omega' => :root
end
