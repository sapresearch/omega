class VolunteeringController < ApplicationController
  require_permission Volunteering::PERM_VIEW

  def index

  end
end