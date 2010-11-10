class CalendarsController < Omega::Controller

  respond_to :html, :xml, :js, :json

  

  
  def index
    @calendars = Calendar.all
    respond_with(@calendar)
  end

  def show
    @events = Event.all
    @calendar = Calendar.find(params[:id])
    respond_with(@calendars)
  end

  def new
    @calendar = Calendar.new
    respond_with(@calendar)
  end

  def create
    @calendar = Calendar.create(params[:calendar])
    respond_with(@calendar)
  end

  def edit
    @calendar = Calendar.find(params[:id])
    respond_with(@calendar)
  end

  def update
    @calendar = Calendar.find(params[:id])
    @calendar.update_attributes(params[:calendar])
    respond_with(@calendar)
  end

  def add_event
    @calendar = Calendar.find(params[:id])
    @event = Event.new(params[:event])
    respond_with(@calendar)
  end

  def destroy
    @calendar = Calendar.find(params[:id]) 
    @calendar.destroy
    respond_with(@calendar)
  end

  def events
    @calendar = Calendar.find(params[:id])
    @events = Event.all
    respond_to do |format|
        format.json {render :json => @events.as_json()}
    end
    
  end
  





end
