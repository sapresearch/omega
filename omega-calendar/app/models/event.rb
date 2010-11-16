class Event < Omega::Model

  belongs_to :calendar

  def as_json(options = {})
    {
        :id => id,
      :title => title,
      :start => start,
      :end => self.end,
      :allDay => allday,
      :url => url,
      :event_description => event_description
    }
  end

  def start_date
    start.try(:to_date)
  end

  def start_date=(value)
    self.start = "#{value} #{start_time}"
  end

  def start_time
    start.try(:to_s, :time)
  end

  def start_time=(value)
    self.start = "#{start_date} #{value}"
  end

  def end_date
    self.end.try(:to_date)
  end

  def end_date=(value)
    self.end = "#{value} #{end_time}"
  end

  def end_time
    self.end.try(:to_s, :time)
  end

  def end_time=(value)
    self.end = "#{end_date} #{value}"
  end
end
