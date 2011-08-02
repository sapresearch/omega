class Event < ActiveRecord::Base
  has_one :service_section, :dependent=>:destroy
  has_one :event_recurrence, :dependent=>:destroy
end

