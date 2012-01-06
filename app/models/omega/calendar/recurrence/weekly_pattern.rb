module Omega
	class Calendar
	  module Recurrence
	    class WeeklyPattern
	      attr_accessor :days, :weeks
	
	      def initialize(attributes = {})
	        attributes.each { |attribute, value| send(:"#{attribute}=", value) }
	      end
	
	      def days
	        @days || {}
	      end
	
	      def weeks
	        @weeks || 1
	      end
	
	      def persisted?
	        false
	      end
	    end
	  end
	end
end
