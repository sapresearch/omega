module Omega
	class ServiceSection < Model
	  # app-spec
	  belongs_to :contact
	  # end app-spec
	  belongs_to :service_leaf
	  belongs_to :service
	  belongs_to :event, :dependent => :destroy
	
	  accepts_nested_attributes_for :event
	
	  class << self
	    def new_with_dependency
	      service_section = ServiceSection.new
	      service_section.build_event
	      service_section
	    end
	  end
	
	  def service
	    service_leaf.service
	  end
	
	  def contact_name
	    contact.nil? ? "TBD..." : contact.name
	  end
	  
	  def location
	    event.location || "TBD..."
	  end
	
	  def start_at
	    event.start_at || "TBD..."
	  end
	
	  def end_at
	    event.end_at || "TBD..."
	  end
	
	  def is_recurrent?
	    event.is_recurrent?
	  end
	
	  def recurrence_end_at
	    return "TBD..." unless is_recurrent?
	    event.event_recurrence.end_at || "TBD..."
	  end
	
	  def recurrence_year
	    event.recurrence_year
	  end
	
	  def recurrence_month
	    event.recurrence_month
	  end
	
	  def recurrence_day
	    event.recurrence_day
	  end
	
	  def recurrence_hour
	    event.recurrence_hour
	  end
	
	  def recurrence_minute
	    event.recurrence_minute
	  end
	
	  def recurrence_interval
	    event.recurrence_interval
	  end
	
	  def recurrence_interval_s
	    event.recurrence_interval_s
	  end
	
	end
end
