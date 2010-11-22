class Calendar
  class ModelObserver < ActiveRecord::Observer
    observe Omega::Model
    
    def after_save(model)
      case model
        when Volunteering::Position
          after_save_volunteering_position(model)
      end
    end
    
    private
      def after_save_volunteering_position(position)
        if event_source = EventSource.for(position) and event_source.synchronize?
          event = event_source.event || Event.new(:event_source => event_source)

          event.calendar_id = event_source.calendar_id

          event_source.mapping.each do |attribute, source|
            next unless source.present?

            event[attribute] = position[source]
          end

          event.save!
        end
      end
  end
end
