	class Calendar
	  module Recurrence
	    class MonthlyPattern
	      attr_accessor :every, :day, :ordinal
	
	      def initialize(attributes = {})
	        attributes.each { |attribute, value| send(:"#{attribute}=", value) }
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
