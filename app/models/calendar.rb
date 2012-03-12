	class Calendar < Model
	  require_dependency 'calendar/event'
	  require_dependency 'calendar/event_source'
	  require_dependency 'calendar/model_observer'
	  require_dependency 'calendar/recurrence'

		self.table_name = 'calendars'
	
	  has_many :events, :dependent => :destroy
	
	  belongs_to :user
	  has_many :shares
	end
