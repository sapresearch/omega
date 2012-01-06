module Omega
	class Calendar
	  class Event < Omega::Model
	    include Recurrence
	
	    belongs_to :calendar
	  
	    has_one :event_source
	
	    scope :recurrent, where('recurrent = ?', true)
	    scope :non_recurrent, where('recurrent = ? or recurrent is null', false)
	
	
	    before_save :calculate_recurrence, :if => :recurrent?
	
	    validates_presence_of :name
	  
	    def as_json(options = {})
	      {
	          :id => id,
	        :title => name,
	        :start => start,
	        :end => self.end,
	        :allDay => all_day,
	        :url => url,
	        :event_description => description,
	        :recurrent => recurrent,
	        :recurrence_series_id => recurrence_series_id
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
	  
	    private
	      def calculate_recurrence
	        # stop if we are a product of a recurrence calculcation but not if we are the "parent"
	        return if recurrence_series_id? and recurrence_series_id != id
	  
	        series = recurrence_events
	        series.destroy_all # TODO: reuse old events for recurrence
	
	        self.start   = nil
	        self.end     = nil
	        self.all_day = nil
	  
	        recurrences do |date|
	          recurrence_events << Event.new do |e|
	            e.calendar_id = calendar_id
	            e.name        = name
	            e.url         = url
	            e.description = description
	            e.start       = recurrence_start_time.change(:year => date.year, :month => date.month, :day => date.day)
	            e.end         = recurrence_end_time.change(:year => date.year, :month => date.month, :day => date.day)
	            e.all_day     = false
	          end
	        end
	      end
	  end
	end
end
