	class HomeController < Controller
	  respond_to :html
	
	  def index
      if current_user != nil and current_user.visit_count == 1
        redirect_to my_page_user_path(current_user) and return
      end
      
      @code = params[:code]
	    @positions =  Volunteering::Position.rank
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
