class VolunteeringController < ApplicationController
  respond_to :html, :js, :xml, :json
  
  require_permission Volunteering::PERM_VIEW

  def index

  end
end