class Calendar < Omega::Model
  require_dependency 'calendar/event'
  require_dependency 'calendar/event_source'
  require_dependency 'calendar/model_observer'
  require_dependency 'calendar/recurrence'

  has_many :events, :dependent => :destroy

  has_many :shares
end
