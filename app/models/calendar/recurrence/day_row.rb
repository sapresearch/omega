	class Calendar
	  module Recurrence
	    class DayRow
	      attr_accessor :days, :months
	
	      def initialize(attributes = {})
	        attributes.each { |attribute, value| send(:"#{attribute}=", value) }
	      end
	
	      def days
	        @days || 1
	      end
	
	      def months
	        @months || 1
	      end
	
	      def persisted?
	        false
	      end
	    end
	  end
	end
