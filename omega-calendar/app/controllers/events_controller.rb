class EventsController < Omega::Controller

  respond_to :html, :xml, :js, :json

  before_filter :get_calendar


 def index
    @events = @calendar.events
    respond_with(@events)
  end

  def show
    @event = @calendar.events.find(params[:id])
    respond_with(@event)
  end

  def new
    @event = Calendar::Event.new do |e|
      e.calendar = @calendar
    end
    respond_with(@event)
  end

  def create
    @event = Calendar::Event.create(params[:calendar_event])
    respond_with(@event)
  end

  def edit
    @event = @calendar.events.find(params[:id])
    respond_with(@event)
  end

  def update
    @event = @calendar.events.find(params[:id])
    @event.update_attributes(params[:calendar_event])
    respond_with(@event)
  end

  def destroy
    @event = @calendar.events.find(params[:id])
    @event.destroy
    respond_with(@event)
  end

  private
    def get_calendar
      @calendar = Calendar.find(params[:calendar_id])
    end
end
