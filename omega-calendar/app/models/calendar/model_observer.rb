class Calendar
  class ModelObserver < ActiveRecord::Observer#Omega::Observer
    observe Omega::Model
    
    def after_save(model)
      case model
        when Volunteering::Position
          after_save_volunteering_position(model)
      end
    end
    
    private
      def after_save_volunteering_position(position)
puts "after_save_volunteering_position(#{position})"
        event_source = EventSource.for(position) || EventSource.create!(:source => position)
        event = event_source.event || Event.new(:event_source => event_source)
        
        event.calendar_id       = 1
        event.title             = position.name
        event.event_description = position.description
        event.start             = position.start
        event.end               = position.end
        
        event.save!
      end
  end
end
