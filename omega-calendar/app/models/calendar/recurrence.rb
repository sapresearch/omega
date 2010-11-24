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
    SUNDAY      = '7' #'sunday'
    MONDAY      = '1' #'monday'
    TUESDAY     = '2' #'tuesday'
    WEDNESDAY   = '3' #'wednesday'
    THURSDAY    = '4' #'thursday'
    FRIDAY      = '5' #'friday'
    SATURDAY    = '6' #'saturday'
    JANUARY     = 1#'january'
    FEBRUARY    = 2#'february'
    MARCH       = 3#'march'
    APRIL       = 4#'april'
    MAY         = 5#'may'
    JUNE        = 6#'june'
    JULY        = 7#'july'
    AUGUST      = 8#'august'
    SEPTEMBER   = 9#'september'
    OCTOBER     = 10#'october'
    NOVEMBER    = 11#'november'
    DECEMBER    = 12#'december'

    END_ON_NEVER  = 'never'
    END_ON_NUMBER = 'number'
    END_ON_DATE   = 'date'

    PATTERNS         = [DAILY, WEEKLY, MONTHLY, YEARLY].freeze
    ORDINALS         = [FIRST, SECOND, THIRD, FOURTH, LAST].freeze
    DAYS_OF_THE_WEEK = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY].freeze
    DAYS             = [DAY, WEEKDAY, WEEKEND_DAY].concat(DAYS_OF_THE_WEEK).freeze
    MONTHS           = [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER].freeze
    
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
