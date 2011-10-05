class Event < ActiveRecord::Base
  has_one :service_section, :dependent=>:destroy
  has_one :event_recurrence, :dependent=>:destroy

  def is_recurrent?
    not event_recurrence.nil?
  end

  def is_endless?
    end_at.nil?
  end

  def is_recurrence_endless?
    event_recurrence.is_endless?
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

  def to_i_periods(begin_at=start_at, until_at = (is_recurrent? ? recurrence_end_at||begin_at+1.year : end_at) )
    return nil if begin_at.nil? || start_at.nil?
    return nil if until_at.nil? && !end_at.nil?
    
    begin_at_i = begin_at.to_i
    start_at_i = start_at.to_i
    end_at_i = end_at.to_i
    until_at_i = until_at.to_i
    return nil if (begin_at_i > until_at_i) && !until_at.nil?
      
    if !is_recurrent? || end_at.nil?
      real_start_at_i = [begin_at_i, start_at_i].max
      real_end_at_i = end_at.nil? ? until_at_i : [until_at_i, end_at_i].min
      return [[real_start_at_i, real_end_at_i]] if (real_start_at_i <= real_end_at_i) || end_at.nil?
      return []
    end

    duration_i = end_at_i - start_at_i    
    interval_i = recurrence_year.year.to_i + recurrence_month.month.to_i + recurrence_day.day.to_i + recurrence_hour.hour.to_i + recurrence_minute.minute.to_i
    periods = []

    # at this point both unitil_at_i and end_at_i won't be 0
    while start_at_i < until_at_i
      end_at_i = until_at_i if end_at_i>until_at_i
      periods << [start_at_i, end_at_i] if start_at_i >= begin_at_i
      periods << [begin_at_i, end_at_i] if begin_at_i > start_at_i && begin_at_i <= end_at_i
      start_at_i = end_at_i+interval_i
      end_at_i = start_at_i+duration_i
    end
    periods
  end

  # future improvement: DP
  def overlapping_periods(event, begin_at=start_at, until_at = (is_recurrent? ? recurrence_end_at||begin_at+1.year : end_at||begin_at+1.year) )
    periods_1 = self.to_i_periods(begin_at, until_at) || []
    periods_2 = event.to_i_periods(begin_at, until_at) || []
    periods = []
    periods_1.each do |p1|
      periods_2.each do |p2|
        start_at = [p1[0], p2[0]].max
        end_at = [p1[1],p2[1]].min
        periods << [start_at, end_at] if start_at < end_at
      end
    end
    periods
  end
  
end

