class Calendar
  class Recurrence
    class DailyPattern
      attr_accessor :every, :days

      def initialize(attributes = {})
        attributes.each { |attribute, value| send(:"#{attribute}=", value) }
      end

      def persisted?
        false
      end
    end
  end
end
