	class Calendar
	  module Recurrence
	    extend ActiveSupport::Concern
	
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
	    JANUARY     = 1 #'january'
	    FEBRUARY    = 2 #'february'
	    MARCH       = 3 #'march'
	    APRIL       = 4 #'april'
	    MAY         = 5 #'may'
	    JUNE        = 6 #'june'
	    JULY        = 7 #'july'
	    AUGUST      = 8 #'august'
	    SEPTEMBER   = 9 #'september'
	    OCTOBER     = 10 #'october'
	    NOVEMBER    = 11 #'november'
	    DECEMBER    = 12 #'december'
	
	    END_ON_NEVER  = 'never'
	    END_ON_NUMBER = 'number'
	    END_ON_DATE   = 'date'
	
	    PATTERNS         = [DAILY, WEEKLY, MONTHLY, YEARLY].freeze
	    ORDINALS         = [FIRST, SECOND, THIRD, FOURTH, LAST].freeze
	    DAYS_OF_THE_WEEK = [SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY].freeze
	    DAYS             = [DAY, WEEKDAY, WEEKEND_DAY].concat(DAYS_OF_THE_WEEK).freeze
	    MONTHS           = [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER].freeze
	
	    included do 
	      belongs_to :recurrence_series, :class_name => '::Calendar::Event'
	      has_many   :recurrence_events, :class_name => '::Calendar::Event', :foreign_key => :recurrence_series_id
	
	      serialize :recurrence_days
	    end
	
	    def recurrence
	      recurrence = RecurrencePattern.new
	      recurrence.start_time = recurrence_start_time
	      recurrence.end_time   = recurrence_end_time
	      recurrence.pattern    = recurrence_pattern
	      recurrence.start      = recurrence_start
	      recurrence.end_on     = recurrence_end_on
	
	      case recurrence_pattern
	        when DAILY
	          recurrence.daily.every = recurrence_every
	          recurrence.daily.days  = recurrence_days
	        when WEEKLY
	          recurrence.weekly.weeks = recurrence_weeks
	          recurrence.weekly.days  = recurrence_days
	        when MONTHLY
	          recurrence.monthly.every = recurrence_every
	
	          case recurrence_every
	            when DAY
	              recurrence.monthly.day.days   = recurrence_days
	              recurrence.monthly.day.months = recurrence_months
	            when ORDINAL
	              recurrence.monthly.ordinal.ordinal = recurrence_ordinal
	              recurrence.monthly.ordinal.days    = recurrence_days
	              recurrence.monthly.ordinal.months  = recurrence_months
	          end
	        when YEARLY
	          recurrence.yearly.every = recurrence_every
	          recurrence.yearly.years = recurrence_years
	
	          case recurrence_every
	            when DAY
	              recurrence.yearly.day.days   = recurrence_days
	              recurrence.yearly.day.months = recurrence_months
	            when ORDINAL
	              recurrence.yearly.ordinal.ordinal = recurrence_ordinal
	              recurrence.yearly.ordinal.days    = recurrence_days
	              recurrence.yearly.ordinal.months  = recurrence_months
	          end
	      end
	
	      case recurrence_end_on
	        when END_ON_NUMBER
	          recurrence.end_after = recurrence_end_after
	        when END_ON_DATE
	          recurrence.end_at = recurrence_end_at
	      end
	
	      recurrence
	    end
	
	    def recurrence_attributes=(attributes)
	      self.recurrence_start_time = attributes['start_time']
	      self.recurrence_end_time   = attributes['end_time']
	      self.recurrence_pattern    = attributes['pattern']
	      self.recurrence_start      = attributes['start']
	      self.recurrence_end_on     = attributes['end_on']
	
	
	      case recurrence_pattern
	        when DAILY
	          if daily = attributes['daily_attributes']
	            self.recurrence_every   = daily['every']
	            self.recurrence_ordinal = nil
	            self.recurrence_days    = daily['days']
	            self.recurrence_weeks   = nil
	            self.recurrence_months  = nil
	            self.recurrence_years   = nil
	          end
	        when WEEKLY
	          if weekly = attributes['weekly_attributes']
	            self.recurrence_every   = weekly['every']
	            self.recurrence_ordinal = nil
	            self.recurrence_days    = weekly['days']
	            self.recurrence_weeks   = weekly['weeks']
	            self.recurrence_months  = nil
	            self.recurrence_years   = nil
	          end
	        when MONTHLY
	          if (monthly = attributes['monthly_attributes']) &&
	             (row     = monthly['every'] == DAY ? monthly['day_attributes'] : monthly['ordinal_attributes'])
	            self.recurrence_every   = monthly['every']
	            self.recurrence_ordinal = row['ordinal']
	            self.recurrence_days    = row['days']
	            self.recurrence_weeks   = nil
	            self.recurrence_months  = row['months']
	            self.recurrence_years   = nil
	          end
	        when YEARLY
	          if (yearly = attributes['yearly_attributes']) &&
	             (row    = yearly['every'] == DAY ? yearly['day_attributes'] : yearly['ordinal_attributes'])
	            self.recurrence_every   = yearly['every']
	            self.recurrence_ordinal = row['ordinal']
	            self.recurrence_days    = row['days']
	            self.recurrence_weeks   = nil
	            self.recurrence_months  = row['months']
	            self.recurrence_years   = yearly['years']
	          end
	      end
	
	      case recurrence_end_on
	        when END_ON_NEVER
	          self.recurrence_end_at    = nil
	          self.recurrence_end_after = nil
	        when END_ON_NUMBER
	          self.recurrence_end_at    = nil
	          self.recurrence_end_after = attributes['end_after']
	        when END_ON_DATE
	          self.recurrence_end_at    = attributes['end_at']
	          self.recurrence_end_after = nil
	      end
	    end
	
	    def recurrences
	      if block_given?
	        date, count = recurrence_start, 1
	
	        loop do
	          case recurrence_pattern
	            when DAILY
	              return if done?(date, count)
	
	              yield date
	              count += 1
	
	              case recurrence_every
	                when DAY
	                  date = date.next_day(recurrence_days.to_i)
	                when WEEKDAY
	                  date = date.friday? ? date.next_week : date.next_day
	              end
	            when WEEKLY
	              day = date.beginning_of_week - 1.day
	
	              DAYS_OF_THE_WEEK.each do |weekday|
	                return if done?(day, count)
	                if recurrence_days[weekday] == '1' && recurrence_start <= day
	                  yield day
	                  count += 1
	                end
	
	                day = day.tomorrow
	              end
	
	              recurrence_weeks.times { date = date.next_week }
	            when MONTHLY
	              month = date.beginning_of_month
	
	              case recurrence_every
	                when DAY
	                  day = month.change(:day => recurrence_days.to_i)
	                when ORDINAL
	                  day = ordinal_change(month, recurrence_ordinal, recurrence_days)
	              end
	
	              return if done?(day, count)
	              if recurrence_start <= day
	                yield day
	                count += 1
	              end
	
	              date = month.next_month(recurrence_months)
	            when YEARLY
	              year = date.beginning_of_year
	
	              case recurrence_every
	                when DAY
	                  day = year.change(:month => recurrence_months, :day => recurrence_days.to_i)
	                when ORDINAL
	                  month = year.change(:month => recurrence_months)
	                  day = ordinal_change(month, recurrence_ordinal, recurrence_days)
	              end
	
	              return if done?(day, count)
	              if recurrence_start <= day
	                yield day
	                count += 1
	              end
	
	              date = year.next_year(recurrence_years)
	            else
	              return
	          end
	        end
	      else
	        list = []
	        recurrences { |date| list << date }
	        list
	      end
	    end
	
	    private
	      def ordinal_change(month, ordinal, day)
	        case ordinal
	          when FIRST
	            week = month
	          when SECOND
	            week = month.advance(:weeks => 1)
	          when THIRD
	            week = month.advance(:weeks => 2)
	          when FOURTH
	            week = month.advance(:weeks => 3)
	          when LAST
	            week = month.next_month.advance(:weeks => -1)
	          else
	            return
	        end
	
	        case day
	          when DAY
	            return week
	          when WEEKDAY
	            return week.next_week
	          when WEEKEND_DAY
	            return week.sunday? ? week : next_day_of_the_week(week, SATURDAY)
	          when *DAYS_OF_THE_WEEK
	            return next_day_of_the_week(date, recurrence_days.to_i)
	        end
	      end
	
	      def next_day_of_the_week(date, day_of_the_week)
	        current_day_of_the_week = date.cwday
	
	        if day_of_the_week >= current_day_of_the_week
	          offset = day_of_the_week - current_day_of_the_week
	        else
	          offset = 7 - (current_day_of_the_week - day_of_the_week)
	        end
	
	        date.advance(:days => offset)
	      end
	
	      def done?(date, count)
	        (date.nil?) ||
	        (recurrence_end_on == END_ON_DATE   && date >= recurrence_end_at) ||
	        (recurrence_end_on == END_ON_NUMBER && count > recurrence_end_after) ||
	        (recurrence_end_on == END_ON_NEVER  && count > 100) ||
	        (count > 600) #just in case
	      end
	  end
	end
