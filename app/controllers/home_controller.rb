	class HomeController < Controller
	  respond_to :html
	
	  def index
	    @positions =  Volunteering::Position.limit(5)
	    @services = Service.limit(5)
			@services = Service.real_public_service_leaves.reverse.take(5)
	    @events = Calendar::Event.limit(6)
	
	   # if @page = Page.find_by_path!('home')
	    #  @blocks = @page.blocks
	     # @components = @page.components
	   # end
	
	    respond_with(@positions, @events)
	  end
	end
