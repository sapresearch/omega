class ApplicationController < ActionController::Base
  include Mixins::Controllers::Crud
  include Mixins::Controllers::CurrentUser
  include Mixins::Controllers::Permissions
  include Mixins::Controllers::SubLayouts

  include Trams::Assets::Dependencies
  
  self.responder = Omega::ApplicationResponder

  protect_from_forgery
  layout 'application'
end
