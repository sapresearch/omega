class VolunteeringController < Omega::Controller
  require_permission Volunteering::PERM_VIEW

  def index

  end
end