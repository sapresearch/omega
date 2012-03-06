module Omega
	class HomeController < Controller
	  respond_to :html
		puts "\n In Omega::HomeController in Omega\n"
		puts "\n In Omega::HomeController in Omega. Defined: #{defined?(Omega::Volunteering::Position)}"
		puts "\n In Omega::HomeController in Omega. Defined volunteering: #{defined?(Omega::Volunteering)}"
	
	  def index
			puts "\n In Omega::HomeController#index in Omega\n"
			puts "\n In Omega::HomeController#index in Omega. Defined: #{defined?(Omega::Volunteering::Position)}"
			puts "\n In Omega::HomeController in Omega#index. Defined volunteering: #{defined?(Omega::Volunteering)}"
	    #@positions =  Volunteering::Position.limit(5)
	    @positions = []
	    # @services = Service.limit(5) # original
		 # just for testing meta.
		 #@services = Service.real_public_service_leaves.reverse.take(5)
	    @events = Calendar::Event.limit(6)
	
	   # if @page = Page.find_by_path!('home')
	    #  @blocks = @page.blocks
	     # @components = @page.components
	   # end
	
	    respond_with(@positions, @events)
	  end
	end
end
