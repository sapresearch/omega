class EventsController < ApplicationController

  respond_to :html, :xml, :js, :json
  

 def index
    @events = Event.all
    respond_with(@events) do |format|
      format.json { render_index_for_calendar }
    end
  end

  def show
    @event = Event.find(params[:id])
    respond_with(@event)
  end

  def new
    @event = Event.new(params[:event])
    respond_with(@event)
  end

  def create
    event = params[:event]
    event[:calendar_id] = 1
    event[:start] = "#{event.delete(:start_date)} #{event.delete(:start_time)}"
    event[:end]   = "#{event.delete(:end_date)} #{event.delete(:end_time)}"

    @event = Event.create(event)
    respond_with(@event) do |format|
      format.json { render :json => { 'IsSuccess' => @event.valid?, 'Msg' => 'add success', 'Data' => @event } }
    end
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

#  layout :determine_layout

  private
    def _layout
      if params[:inline]
        'simple'
      else
        super
      end
    end

    def render_index_for_calendar
      render :json => {
        :events => (@events.map do |event|
          [event.id, event.title, event.start, event.end, event.allday, event.crossday, 0, 0, 1, "", ""]
        end),
        :issort => true,
        :start => "",
        :end => "",
        :error => nil
      }
    end
end
