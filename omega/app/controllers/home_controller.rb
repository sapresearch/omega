class HomeController < Omega::Controller
  respond_to :html

  def index
    @positions =  Volunteering::Position.limit(5)
    @events = Calendar::Event.limit(6)

    if @page = Page.find_by_path!('home')
      @blocks = @page.blocks
      @components = @page.components
    end

    respond_with(@positions, @events)
  end
end
