module Omega
	class CalendarsController < Omega::Controller
	  respond_to :html, :xml, :js, :json
	  before_filter :get_scope
	
	  def index
	    @calendars = @scope
	    respond_with(@calendars)
	  end
	
	  def administer
	    @calendars = @scope
	  end
	
	  def show
	    @calendar = @scope.find(params[:id])
	    @events = @calendar.events
	    respond_with(@calendars)
	  end
	
	  def new
	    @calendar = @scope.new
	    respond_with(@calendar)
	  end
	
	  def create
	    @calendar = @scope.create(params[:calendar])
	    respond_with(@calendar, :location => @calendar)
	  end
	
	  def edit
	    @calendar = @scope.find(params[:id])
	    respond_with(@calendar)
	  end
	
	  def update
	    @calendar = @scope.find(params[:id])
	    @calendar.update_attributes(params[:calendar])
	    respond_with(@calendar)
	  end
	
	  def add_event
	    @calendar = @scope.find(params[:id])
	    @event = Event.new(params[:event])
	    respond_with(@calendar)
	  end
	
	  def destroy
	    @calendar = @scope.find(params[:id])
	    @calendar.destroy
	    respond_with(@calendar)
	  end
	
	  def events
	    @calendar = @scope.find(params[:id])
	    @events = Event.all
	    respond_to do |format|
	        format.json { render :json => @events.as_json() }
	    end
	  end
	
	  def share
	    @calendar = @scope.find(params[:id])
	    @share = @calendar.shares.new
	  end
	
	  protected
	    def get_scope
	      if params[:user_id]
	        @user = User.find(params[:user_id])
	        @scope = Calendar.where(:user_id => @user)
	      else
	        @scope = Calendar.scoped
	      end
	    end
	end
end
