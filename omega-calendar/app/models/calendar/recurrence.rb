class Calendar
  class Recurrence
    DAILY    = 'daily'
    WEEKLY   = 'weekly'
    MONTHLY  = 'monthly'
    YEARLY   = 'yearly'

    ORDINAL     = 'ordinal'
    FIRST       = 'first'
    SECOND      = 'second'
    THIRD       = 'third'
    FOURTH      = 'fourth'
    LAST        = 'last'
    DAY         = 'day'
    WEEKDAY     = 'weekday'
    WEEKEND_DAY = 'weekend day'
    SUNDAY      = 'sunday'
    MONDAY      = 'monday'
    TUESDAY     = 'tuesday'
    WEDNESDAY   = 'wednesday'
    THURSDAY    = 'thursday'
    FRIDAY      = 'friday'
    SATURDAY    = 'saturday'
    JANUARY     = 'january'
    FEBRUARY    = 'february'
    MARCH       = 'march'
    APRIL       = 'april'
    MAY         = 'may'
    JUNE        = 'june'
    JULY        = 'july'
    AUGUST      = 'august'
    SEPTEMBER   = 'september'
    OCTOBER     = 'october'
    NOVEMBER    = 'november'
    DECEMBER    = 'december'

    END_ON_NEVER  = 'never'
    END_ON_NUMBER = 'number'
    END_ON_DATE   = 'date'

    PATTERNS = [DAILY, WEEKLY, MONTHLY, YEARLY]
    ORDINALS = [FIRST, SECOND, THIRD, FOURTH, LAST]
    DAYS     = [DAY, WEEKDAY, WEEKEND_DAY, SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY]
    MONTHS   = [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER]
    
    require_dependency 'calendar/recurrence/daily_pattern'
    require_dependency 'calendar/recurrence/weekly_pattern'
    require_dependency 'calendar/recurrence/monthly_pattern'
    require_dependency 'calendar/recurrence/yearly_pattern'
    require_dependency 'calendar/recurrence/day_row'
    require_dependency 'calendar/recurrence/ordinal_row'
  
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

    def end_on
      @end_on || END_ON_NEVER
    end

    def end_after
      @end_after || 10
    end

    def end_at
      @end_at || Time.now.next_year
    end

    def persisted?
      false
    end
  end
end
