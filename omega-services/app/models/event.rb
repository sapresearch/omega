class Event < ActiveRecord::Base
  has_one :service_section, :dependent=>:destroy
  has_one :event_recurrence, :dependent=>:destroy

  def is_recurrent?
    not event_recurrence.nil?
  end

  def recurrence_end_at
    return nil unless is_recurrent?
    event_recurrence.end_at
  end

  def recurrence_year
    return nil unless is_recurrent?
    interval_values_hash = ActiveSupport::JSON.decode(event_recurrence.interval)
    return interval_values_hash["year"].to_i
  end

  def recurrence_month
    return nil unless is_recurrent?
    interval_values_hash = ActiveSupport::JSON.decode(event_recurrence.interval)
    return interval_values_hash["month"].to_i
  end

  def recurrence_day
    return nil unless is_recurrent?
    interval_values_hash = ActiveSupport::JSON.decode(event_recurrence.interval)
    return interval_values_hash["day"].to_i
  end

  def recurrence_hour
    return nil unless is_recurrent?
    interval_values_hash = ActiveSupport::JSON.decode(event_recurrence.interval)
    return interval_values_hash["hour"].to_i
  end

  def recurrence_minute
    return nil unless is_recurrent?
    interval_values_hash = ActiveSupport::JSON.decode(event_recurrence.interval)
    return interval_values_hash["minute"].to_i
  end

  def recurrence_interval
    return nil unless is_recurrent?
    interval_values_hash = ActiveSupport::JSON.decode(event_recurrence.interval)
    result = ""
    interval_values_hash.each do |key,value|
      result += value.to_s+" "+key.to_s+" " if value.to_i == 1
      result += value.to_s+" "+key.to_s.pluralize+" " if value.to_i > 1
    end
    result.strip!
  end

  def to_i_period(until_at = (is_recurrent? ? recurrence_end_at : end_at) )
    return nil if until_at.nil?
    [start_at.to_i, until_at.to_i]
  end

  def to_i_periods(until_at = (is_recurrent? ? recurrence_end_at||Time.now+1.year : end_at) )
    return nil if until_at.nil?
    start_at_i = start_at.to_i
    end_at_i = end_at.to_i
    return [[start_at.to_i, end_at.to_i]] unless is_recurrent?

    duration_i = end_at_i - start_at_i
    until_at_i = until_at.to_i
    interval_i = recurrence_year.year.to_i + recurrence_month.month.to_i + recurrence_day.day.to_i + recurrence_hour.hour.to_i + recurrence_minute.minute.to_i
    periods = []
    while start_at_i < until_at_i
      end_at_i = until_at_i if end_at_i>until_at_i
      periods << [start_at_i, end_at_i]
      start_at_i = end_at_i+interval_i
      end_at_i = start_at_i+duration_i
    end
    periods
  end
  
  def overlapping_periods(event, until_at = (is_recurrent? ? recurrence_end_at||Time.now+1.year : end_at||Time.now+1.year) )
    periods_1 = self.to_i_periods(until_at)
    periods_2 = event.to_i_periods(until_at)
    periods = []
    periods_1.each do |p1|
      periods_2.each do |p2|
        start_at = p1[0]>p2[0] ? p1[0] : p2[0]
        end_at = p1[1]>p2[1] ? p2[1] : p1[1]
        periods << [start_at, end_at] if start_at < end_at
      end
    end
    periods
  end
  
end

