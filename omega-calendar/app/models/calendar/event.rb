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
          p = { :every => self.recurrence_every }

          case self.recurrence_every
            when Recurrence::DAY
              p[:day_attributes] = { :days => self.recurrence_days, :months => self.recurrence_months }
            when Recurrence::ORDINAL
              p[:ordinal_attributes] = { :ordinal => self.recurrence_ordinal, :days  => self.recurrence_days,
                                         :months  => self.recurrence_months,  :years => self.recurrence_years }
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
             (row     = (monthly['every'] == Recurrence::DAY) ? monthly['day_attributes'] : monthly['ordinal_attributes'])
            self.recurrence_every   = monthly['every']
            self.recurrence_ordinal = row['ordinal']
            self.recurrence_days    = row['days']
            self.recurrence_weeks   = nil
            self.recurrence_months  = row['months']
            self.recurrence_years   = nil
          end
        when Recurrence::YEARLY
          if (yearly = attributes['yearly_attributes']) &&
             (row    = (yearly['every'] == Recurrence::DAY) ? yearly['day_attributes'] : yearly['ordinal_attributes'])
            self.recurrence_every   = yearly['every']
            self.recurrence_ordinal = row['ordinal']
            self.recurrence_days    = row['days']
            self.recurrence_weeks   = nil
            self.recurrence_months  = row['months']
            self.recurrence_years   = yearly['years']
          end
#        else
#          raise(ArgumentError, 'pattern is missing')
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
  
        recurrences do |date|
  
        end
      end
  
      def recurrences
        date = recurrence_start
  
        loop do
#          break if (stop = recurrence_end_at) && date >= stop
          
          case recurrence_pattern
            when Recurrence::DAILY
              yield date

              case recurrence_every
                when Recurrence::DAY
                  step = recurrence_days.to_i
                  date = date.next_day(step)
                when Recurrence::WEEKDAY
                  if date.friday?
                    date = date.next_week
                  else
                    date = date.next_day
                  end
              end
            when Recurrence::WEEKLY
              week = date.beginning_of_week

              sunday    = week      - 1.day
              monday    = sunday    + 1.day
              tuesday   = monday    + 1.day
              wednesday = tuesday   + 1.day
              thursday  = wednesday + 1.day
              friday    = thursday  + 1.day
              saturday  = friday    + 1.day


              yield sunday    if recurrence_days[Recurrence::SUNDAY] == '1'    && sunday    >= recurrence_start
              yield monday    if recurrence_days[Recurrence::MONDAY] == '1'    && monday    >= recurrence_start
              yield tuesday   if recurrence_days[Recurrence::TUESDAY] == '1'   && tuesday   >= recurrence_start
              yield wednesday if recurrence_days[Recurrence::WEDNESDAY] == '1' && wednesday >= recurrence_start
              yield thursday  if recurrence_days[Recurrence::THURSDAY] == '1'  && thursday  >= recurrence_start
              yield friday    if recurrence_days[Recurrence::FRIDAY] == '1'    && friday    >= recurrence_start
              yield saturday  if recurrence_days[Recurrence::SATURDAY] == '1'  && saturday  >= recurrence_start

              recurrence_weeks.times { date = date.next_week }
            when Recurrence::MONTHLY
            when Recurrence::YEARLY
  
          end
        end
      end
  end
end
