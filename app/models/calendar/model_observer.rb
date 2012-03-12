	class Calendar
	  class ModelObserver < ActiveRecord::Observer
	    observe Model
	    
	    def after_save(model)
	      puts "after_save(#{model})"
	      case model
	        when Volunteering::Position
	          after_save_volunteering_position(model)
	      end
	    end
	    
	    private
	      def after_save_volunteering_position(position)
	        if (event_source = EventSource.for(position)) && event_source.synchronize?
	          event = event_source.event || Event.new(:event_source => event_source)
	
	          event.calendar_id = event_source.calendar_id
	          event.name        = position.name
	          event.description = position.description
	
	          if position.recurrent?
	            [:recurrent, :recurrence_start_time, :recurrence_end_time,
	             :recurrence_pattern, :recurrence_every, :recurrence_ordinal, :recurrence_days, :recurrence_weeks, :recurrence_months, :recurrence_years,
	             :recurrence_start, :recurrence_end_on, :recurrence_end_at, :recurrence_end_after].each do |attribute|
	              event[attribute] = position[attribute]
	            end
	          else
	            event.start = position.start
	            event.end   = position.end
	          end
	
	          event.save!
	        end
	      end
	  end
	end
