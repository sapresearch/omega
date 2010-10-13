class ApplicationController < ActionController::Base
  include Omega::Mixins::Controllers::Breadcrumbs
  include Omega::Mixins::Controllers::Crud
  include Omega::Mixins::Controllers::CurrentUser
  include Omega::Mixins::Controllers::Permissions
  include Omega::Mixins::Controllers::SubLayouts

  include Omega::Assets::Dependencies
  
#  self.responder = Omega::ApplicationResponder

  protect_from_forgery
  layout 'application'

  respond_to :html, :xml, :js, :json

  breadcrumb 'Omega' => :root

  before_filter :set_user_time_zone

  private
    def set_user_time_zone
      Time.zone = current_user.time_zone
    end
end
