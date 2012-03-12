	class Calendar < Model
	  require_dependency 'omega/calendar/event'
	  require_dependency 'omega/calendar/event_source'
	  require_dependency 'omega/calendar/model_observer'
	  require_dependency 'omega/calendar/recurrence'

		self.table_name = 'calendars'
	
	  has_many :events, :dependent => :destroy
	
	  belongs_to :user
	  has_many :shares
	end
