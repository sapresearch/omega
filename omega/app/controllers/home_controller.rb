class HomeController < Omega::Controller
  respond_to :html

  def index
    @positions =  Volunteering::Position.limit(5)
    @events = Event.limit(6)
    respond_with(@positions, @events)
  end
end
