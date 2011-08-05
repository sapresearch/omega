class ServiceSection < ActiveRecord::Base
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
    not event.event_recurrence.nil?
  end

  def recurrence_end_at
    return nil unless is_recurrent?
    event.event_recurrence.end_at
  end

  def recurrence_interval
    return nil unless is_recurrent?
    interval_values_hash = ActiveSupport::JSON.decode(event.event_recurrence.interval)
    result = ""
    interval_values_hash.each do |key,value|
      result += value.to_s+" "+key.to_s+" " if value.to_i == 1
      result += value.to_s+" "+key.to_s.pluralize+" " if value.to_i > 1
    end
    result.strip!
  end

end
