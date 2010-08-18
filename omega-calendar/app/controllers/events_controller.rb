class EventsController < ApplicationController

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
    @event = Event.create(params[:event])
    respond_with(@event)
  end

  def edit
    @calendar = Calendar.find(params[:id])
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
