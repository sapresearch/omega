class Event < ActiveRecord::Base
  has_one :service_section
  has_one :event_recurrence
end

