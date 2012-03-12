	class Calendar
	  module Recurrence
	    class YearlyPattern
	      attr_accessor :every, :years, :day, :ordinal
	
	      def initialize(attributes = {})
	        attributes.each { |attribute, value| send(:"#{attribute}=", value) }
	      end
	
	      def years
	        @years || 1
	      end
	
	      def day
	        @day ||= DayRow.new
	      end
	
	      def day_attributes=(attributes)
	        self.day = DayRow.new(attributes)
	      end
	
	      def ordinal
	        @ordinal ||= OrdinalRow.new
	      end
	
	      def ordinal_attributes=(attributes)
	        self.ordinal = OrdinalRow.new(attributes)
	      end
	
	      def persisted?
	        false
	      end
	    end
	  end
	end
