class Calendar
  module Recurrence
    class RecurrencePattern
      attr_accessor :start_time, :end_time, :pattern, :daily, :weekly, :monthly, :yearly, :start, :end_on, :end_after, :end_at

      def initialize(attributes = {})
        attributes.each { |attribute, value| send(:"#{attribute}=", value) }
        yield(self) if block_given?
      end

      def daily
        @daily ||= DailyPattern.new
      end

      def daily_attributes=(attributes)
        self.daily = DailyPattern.new(attributes)
      end

      def weekly
        @weekly ||= WeeklyPattern.new
      end

      def weekly_attributes=(attributes)
        self.weekly = WeeklyPattern.new(attributes)
      end

      def monthly
        @monthly ||= MonthlyPattern.new
      end

      def monthly_attributes=(attributes)
        self.monthly = MonthlyPattern.new(attributes)
      end

      def yearly
        @yearly ||= YearlyPattern.new
      end

      def yearly_attributes=(attributes)
        self.yearly = YearlyPattern.new(attributes)
      end

      def start
        @start || Date.today
      end

      def end_on
        @end_on || END_ON_NEVER
      end

      def end_after
        @end_after || 10
      end

      def end_at
        @end_at || Date.today.next_year
      end

      def persisted?
        false
      end
    end
  end
end
