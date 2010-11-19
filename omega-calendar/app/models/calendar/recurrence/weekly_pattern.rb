class Calendar
  class Recurrence
    class WeeklyPattern
      attr_accessor :days, :weeks

      def initialize(attributes = {})
        attributes.each { |attribute, value| send(:"#{attribute}=", value) }
      end

      def days
        {}
      end

      def weeks
        1
      end

      def persisted?
        false
      end
    end
  end
end
