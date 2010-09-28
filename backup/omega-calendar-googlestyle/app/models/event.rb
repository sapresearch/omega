class Event < ActiveRecord::Base

  belongs_to :calendar

  def as_json(options = {})
    {
      :title => title,
      :start => start,
      :end => self.end,
      :allDay => allday,
      :url => url,
      :event_description => event_description
    }
  end

  def start_time
    start.try(:to_time)
  end

  def start_date
    start.try(:to_date)
  end

  def end_time
    self.end.try(:to_time)
  end

  def end_date
    self.end.try(:to_date)
  end

  def crossday
    start.try(:to_date) != self.end.try(:to_date)
  end
end
