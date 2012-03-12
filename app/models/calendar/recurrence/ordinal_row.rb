	class Calendar
	  module Recurrence
	    class OrdinalRow
	      attr_accessor :ordinal, :days, :months
	
	      def initialize(attributes = {})
	        attributes.each { |attribute, value| send(:"#{attribute}=", value) }
	      end
	
	      def ordinal
	        @ordinal || 'first'
	      end
	
	      def days
	        @days || 'day'
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
