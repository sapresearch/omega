module Omega
	class ServiceLeaf < Omega::Model
	  belongs_to :service
	  has_many :service_registrations, :dependent => :destroy
	  has_many :registrants, :class_name=>"Contact", :through=>:service_registrations
	  has_many :service_sections, :dependent => :destroy
	  has_many :asset_allocations, :dependent => :destroy
	  has_many :assets, :through => :asset_allocations
	  
	  accepts_nested_attributes_for :service_sections
	
	  def accepted_registrants
	    service_registrations.select{|sr|sr.status=="accepted"}.map{|sr|sr.registrant}
	  end
	
	  def is_blocked?
	    is_blocked
	  end
	
	  def block
	    update_attribute(:is_blocked, true)
	  end
	
	  def unblock
	    update_attribute(:is_blocked, false)
	  end
	
	  def periods_union(begin_at=Time.now, until_at=begin_at+1.year)
	    Event.periods_union(service_sections.map{|ss|ss.event.to_i_periods(begin_at, until_at).to_a})
	    #service_sections.inject([]){|r, ss| Event.periods_union([r,ss.event.to_i_periods(begin_at, until_at).to_a])}
	  end
	
	  # not efficient for more than 2 services in a loop, repetitively calling periods_union
	  def time_overlapping_periods_with(service_leaf, begin_at=Time.now, until_at=begin_at+1.year)
	    periods_union_1 = self.periods_union(begin_at, until_at)
	    periods_union_2 = service_leaf.periods_union(begin_at, until_at)
	    return Event.periods_intersection([periods_union_1,periods_union_2])
	  end
	
	  def next_event(time = Time.now)
	    return nil if time.nil?
	    service_section = next_section(time)
	    service_section.nil? ? nil : service_section.event
	  end
	
	  def next_section(time = Time.now)
	    return nil if time.nil?
	    time_i = time.to_i
	    result_section = nil
	    min_next_time = nil
	    service_sections.each do |service_section|
	      next_time = nil
	      event = service_section.event
	      next if event.start_at.nil? || event.end_at.nil?     
	      start_at_i = event.start_at.to_i
	      if start_at_i >= time_i
	        next_time = start_at_i
	      elsif event.is_recurrent?
	        next if !event.is_recurrence_endless? && event.recurrence_end_at.to_i < time_i
	        until_at_i = event.event_recurrence.end_at.to_i
	        interval_i = event.recurrence_interval
	        remainder = (time_i - start_at_i)%interval_i
	        start_at_i = time_i + interval_i - remainder
	        next if start_at_i >= until_at_i
	        next_time = start_at_i
	      else
	        next if start_at_i <= time_i
	        next_time = start_at_i
	      end
	      if (min_next_time.nil? && !next_time.nil?) || (!min_next_time.nil? && !next_time.nil? && min_next_time > next_time)
	        min_next_time = next_time
	        result_section = service_section
	      end      
	    end
	    result_section
	  end
	  alias_method :next_service_section, :next_section
	
	end
end
