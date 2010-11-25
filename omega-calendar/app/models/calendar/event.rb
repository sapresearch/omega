require 'ostruct'

class Calendar
  class Event < Omega::Model
    belongs_to :calendar
  
    has_one :event_source
  
    def as_json(options = {})
      {
          :id => id,
        :title => name,
        :start => start,
        :end => self.end,
        :allDay => all_day,
        :url => url,
        :event_description => description
      }
    end
  
    def start_date
      start.try(:to_date)
    end
  
    def start_date=(value)
      self.start = "#{value} #{start_time}"
    end
  
    def start_time
      start.try(:to_s, :time)
    end
  
    def start_time=(value)
      self.start = "#{start_date} #{value}"
    end
  
    def end_date
      self.end.try(:to_date)
    end
  
    def end_date=(value)
      self.end = "#{value} #{end_time}"
    end
  
    def end_time
      self.end.try(:to_s, :time)
    end
  
    def end_time=(value)
      self.end = "#{end_date} #{value}"
    end
  
    belongs_to :recurrence_series, :class_name => '::Calendar::Event'
    has_many   :recurrence_events, :class_name => '::Calendar::Event', :foreign_key => :recurrence_series_id

    before_save :calculate_recurrence
  
    serialize :recurrence_days
  
    def recurrence
      attributes = ActiveSupport::HashWithIndifferentAccess.new
      attributes.update(:pattern => self.recurrence_pattern,
                        :start_time => self.recurrence_start_time, :end_time => self.recurrence_end_time,
                        :start => self.recurrence_start, :end_on => self.recurrence_end_on)
  
      case self.recurrence_pattern
        when Recurrence::DAILY
          attributes[:daily_attributes] = { :every => self.recurrence_every, :days => self.recurrence_days }
        when Recurrence::WEEKLY
          attributes[:weekly_attributes] = { :weeks => self.recurrence_weeks, :days => self.recurrence_days }
        when Recurrence::MONTHLY
          p = { :every => self.recurrence_every }

          case self.recurrence_every
            when Recurrence::DAY
              p[:day_attributes] = { :days => self.recurrence_days, :months => self.recurrence_months }
            when Recurrence::ORDINAL
              p[:ordinal_attributes] = { :ordinal => self.recurrence_ordinal, :days  => self.recurrence_days,
                                         :months  => self.recurrence_months }
          end

          attributes[:monthly_attributes] = p
        when Recurrence::YEARLY
          p = { :every => self.recurrence_every, :years => self.recurrence_years }

          case self.recurrence_every
            when Recurrence::DAY
              p[:day_attributes] = { :days => self.recurrence_days, :months => self.recurrence_months }
            when Recurrence::ORDINAL
              p[:ordinal_attributes] = { :ordinal => self.recurrence_ordinal, :days => self.recurrence_days,
                                         :months  => self.recurrence_months }
          end

          attributes[:yearly_attributes] = p
      end
  
      case self.recurrence_end_on
        when Recurrence::END_ON_NUMBER
          attributes.update(:end_after => self.recurrence_end_after)
        when Recurrence::END_ON_DATE
          attributes.update(:end_at => self.recurrence_end_at)
      end
  
      Recurrence.new(attributes)
    end
  
    def recurrence_attributes=(attributes)
      self.recurrence_start_time = attributes['start_time']
      self.recurrence_end_time   = attributes['end_time']

      case self.recurrence_pattern = attributes['pattern']
        when Recurrence::DAILY
          if daily = attributes['daily_attributes']
            self.recurrence_every   = daily['every']
            self.recurrence_ordinal = nil
            self.recurrence_days    = daily['days']
            self.recurrence_weeks   = nil
            self.recurrence_months  = nil
            self.recurrence_years   = nil
          end
        when Recurrence::WEEKLY
          if weekly = attributes['weekly_attributes']
            self.recurrence_every   = weekly['every']
            self.recurrence_ordinal = nil
            self.recurrence_days    = weekly['days']
            self.recurrence_weeks   = weekly['weeks']
            self.recurrence_months  = nil
            self.recurrence_years   = nil
          end
        when Recurrence::MONTHLY
          if (monthly = attributes['monthly_attributes']) &&
             (row     = monthly['every'] == Recurrence::DAY ? monthly['day_attributes'] : monthly['ordinal_attributes'])
            self.recurrence_every   = monthly['every']
            self.recurrence_ordinal = row['ordinal']
            self.recurrence_days    = row['days']
            self.recurrence_weeks   = nil
            self.recurrence_months  = row['months']
            self.recurrence_years   = nil
          end
        when Recurrence::YEARLY
          if (yearly = attributes['yearly_attributes']) &&
             (row    = yearly['every'] == Recurrence::DAY ? yearly['day_attributes'] : yearly['ordinal_attributes'])
            self.recurrence_every   = yearly['every']
            self.recurrence_ordinal = row['ordinal']
            self.recurrence_days    = row['days']
            self.recurrence_weeks   = nil
            self.recurrence_months  = row['months']
            self.recurrence_years   = yearly['years']
          end
      end

      self.recurrence_start = attributes['start']

      case self.recurrence_end_on = attributes['end_on']
        when Recurrence::END_ON_NEVER
          self.recurrence_end_at    = nil
          self.recurrence_end_after = nil
        when Recurrence::END_ON_NUMBER
          self.recurrence_end_at    = nil
          self.recurrence_end_after = attributes['end_after']
        when Recurrence::END_ON_DATE
          self.recurrence_end_at    = attributes['end_at']
          self.recurrence_end_after = nil
      end
    end
  
    private
      def calculate_recurrence
        # stop if we are a product of a recurrence calculcation but not if we are the "parent"
        return if recurrence_series_id? and recurrence_series_id != id
  
        series = recurrence_events
        series.destroy_all # TODO: reuse old events for recurrence

        self.start   = nil
        self.end     = nil
        self.all_day = nil
  
        recurrences do |date|
          Event.new do |e|
            e.calendar_id = calendar_id
            e.name        = name
            e.url         = url
            e.description = description
            e.start       = recurrence_start_time.change(:year => date.year, :month => date.month, :day => date.day)
            e.end         = recurrence_end_time.change(:year => date.year, :month => date.month, :day => date.day)
            e.all_day     = false

            e.recurrence_series = self
          end.save(:validate => false)
        end
      end
  
      def recurrences
        date, count = recurrence_start, 1
  
        loop do
          case recurrence_pattern
            when Recurrence::DAILY
              return if done?(date, count)

              yield date
              count += 1

              case recurrence_every
                when Recurrence::DAY
                  date = date.next_day(recurrence_days.to_i)
                when Recurrence::WEEKDAY
                  date = date.friday? ? date.next_week : date.next_day
              end
            when Recurrence::WEEKLY
              day = date.beginning_of_week - 1.day

              Recurrence::DAYS_OF_THE_WEEK.each do |weekday|
                return if done?(day, count)
                if recurrence_days[weekday] == '1' && recurrence_start <= day
                  yield day
                  count += 1
                end

                day = day.tomorrow
              end

              recurrence_weeks.times { date = date.next_week }
            when Recurrence::MONTHLY
              month = date.beginning_of_month

              case recurrence_every
                when Recurrence::DAY
                  day = month.change(:day => recurrence_days.to_i)
                when Recurrence::ORDINAL
                  day = ordinal_change(month, recurrence_ordinal, recurrence_days)
              end

              return if done?(day, count)
              if recurrence_start <= day
                yield day
                count += 1
              end

              date = month.next_month(recurrence_months)
            when Recurrence::YEARLY
              year = date.beginning_of_year

              case recurrence_every
                when Recurrence::DAY
                  day = year.change(:month => recurrence_months, :day => recurrence_days.to_i)
                when Recurrence::ORDINAL
                  month = year.change(:month => recurrence_months)
                  day = ordinal_change(month, recurrence_ordinal, recurrence_days)
              end

              return if done?(day, count)
              if recurrence_start <= day
                yield day
                count += 1
              end

              date = year.next_year(recurrence_years)
          end
        end
      end

      def ordinal_change(month, ordinal, day)
        case ordinal
          when Recurrence::FIRST
            week = month
          when Recurrence::SECOND
            week = month.advance(:weeks => 1)
          when Recurrence::THIRD
            week = month.advance(:weeks => 2)
          when Recurrence::FOURTH
            week = month.advance(:weeks => 3)
          when Recurrence::LAST
            week = month.next_month.advance(:weeks => -1)
          else
            return
        end

        case day
          when Recurrence::DAY
            return week
          when Recurrence::WEEKDAY
            return week.next_week
          when Recurrence::WEEKEND_DAY
            return week.sunday? ? week : next_day_of_the_week(week, Recurrence::SATURDAY)
          when *Recurrence::DAYS_OF_THE_WEEK
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
        (recurrence_end_on == Recurrence::END_ON_DATE   && date >= recurrence_end_at) ||
        (recurrence_end_on == Recurrence::END_ON_NUMBER && count > recurrence_end_after) ||
        (recurrence_end_on == Recurrence::END_ON_NEVER  && count > 100) ||
        (count > 600) #just in case
      end
  end
end
