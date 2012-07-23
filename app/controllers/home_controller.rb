	class HomeController < Controller
	  respond_to :html
	
	  def index
      if current_user != nil and current_user.visit_count == 1 and session[:first_time_redirect]
        session[:first_time_redirect] = false
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

      #customization fields
      @homepage_headline = "Welcome to the Happyville Community Center"
      @homepage_description =  "We are a community based organization offering a number of services to the local community.
                                Feel free to browse our services and sign-up.  We are also looking
                                for your support.  If you would like to help us with our mission
                                feel free to look through our voluteer opportunities and sign-up!"
      @customization = @setting.customization
      if @customization
        @homepage_headline = @customization.homepage_headline
        @homepage_description = @customization.homepage_description
      end
	
	    respond_with(@positions, @events)
	  end
	end
