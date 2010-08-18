class Event < ActiveRecord::Base

  belongs_to :calendar

  def as_json(options ={})
  { :title => self.title,
    :start => self.start.strftime('%Y-%m-%dT%H:%M'),
    :end => self.end.strftime('%Y-%m-%dT%H:%M'),

    :allday => self.allday,
    :url => self.url,
    :event_description => self.event_description
  }

  end
  
  
end
