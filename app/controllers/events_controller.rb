	class EventsController < Controller
	
	  respond_to :html, :xml, :js, :json
	
	  before_filter :get_calendar
	
	
	  def index
	    @events = @calendar.events.non_recurrent
	    respond_with('tenant', @events)
	  end
	
	  def show
	    @event = @calendar.events.find(params[:id])
	    respond_with('tenant', @event)
	  end
	
	  def new
	    @event = @calendar.events.build
	    respond_with('tenant', @event)
	  end
	
	  def create
	    @event = @calendar.events.create(params[:calendar_event])
	    respond_with('tenant', @event)
	  end
	
	  def edit
	    @event = @calendar.events.find(params[:id])
	    respond_with('tenant', @event)
	  end
	
	  def update
	    @event = @calendar.events.find(params[:id])
	    @event.update_attributes(params[:calendar_event])
	    respond_with('tenant', @event)
	  end
	
	  def destroy
	    @event = @calendar.events.find(params[:id])
	    @event.destroy
	    respond_with('tenant', @event)
	  end
	
	  private
	    def get_calendar
	      @calendar = Calendar.find(params[:calendar_id])
	    end
	end
