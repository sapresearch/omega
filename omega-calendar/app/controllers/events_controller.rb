class EventsController < Omega::Controller

  respond_to :html, :xml, :js, :json


 def index
    @events = Event.all
    respond_with(@events)
  end

  def show
    @event = Event.find(params[:id])
    respond_with(@event)
  end

  def new
    @event = Event.new
    respond_with(@event)
  end

  def create
    event = params[:event]
    event[:start] = "#{event.delete(:start_date)} #{event.delete(:start_time)}"
    event[:end]   = "#{event.delete(:end_date)} #{event.delete(:end_time)}"

    @event = Event.create(event)
    respond_with(@event)
  end

  def edit
    @calendar = Calendar.find(params[:calendar_id])
    @event = Event.find(params[:id])
    respond_with(@event)
  end

  def update
    @event = Event.find(params[:id])
    @event.update_attributes(params[:event])
    respond_with(@event)
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    respond_with(@event)
  end

end
