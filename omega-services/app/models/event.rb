class Event < ActiveRecord::Base
  has_one :service_section, :dependent=>:destroy
  has_one :event_recurrence, :dependent=>:destroy

  class <<self

    # not used in periods_union for efficiency reason
    def period_union(period_1,period_2)
      periods = []
      if period_1[0]>period_2[1] || period_1[1]<period_2[0]
        periods << period_1 << period_2
      else
        periods << [[period_1[0],period_2[0]].min, [period_1[1],period_2[1]].max]
      end
      periods
    end

    # not used in periods_intersection for efficiency reason
    def period_intersection(period_1,period_2)
      period = []
      if period_1[0]<=period_2[1] && period_1[1]>=period_2[0]
        period = [[period_1[0], period_2[0]].max, [period_1[1],period_2[1]].min]
      end
      period
    end

    # linear O(n)
    def periods_union(periods_1, periods_2)
      periods = []
      i=0;j=0
      p1 = periods_1[i]
      p2 = periods_2[j]
      length_1 = periods_1.length
      length_2 = periods_2.length
      while true
        if p1[1]<p2[0]
          periods << p1
          i+=1
          if i<length_1
            p1 = periods_1[i]
          else
            (j...length_2-1).each{|k|periods << periods_2[k]}
            break;
          end
        elsif p2[0]<p1[1]
          periods << p2
          j+=1
          if j<length_2
            p2 = periods_2[j]
          else
            (i...length_1-1).each{|k|periods << periods_1[k]}
            break;
          end
        elsif p1[0]<=p2[1] && p1[1]>=p2[0]
          tmp_period = [[p1[0],p2[0]].min, [p1[1],p2[1]].max]
          if tmp_period[1]==p1[1]
            j+=1
            p1 = tmp_period
            if j<length_2
              p2 = periods_2[j]
            else
              periods << p1
              ((i+1)...length_1).each{|k|periods << periods_1[k]}
              break;
            end
          elsif tmp_period[1]==p2[1]
            i+=1
            p2 = tmp_period
            if i<length_1
              p1 = periods_1[i]
            else
              periods << p2
              ((j+1)...length_2).each{|k|periods << periods_2[k]}
              break;
            end
          end
        end
      end
      periods
    end

    def periods_intersection(periods_1,periods_2)
      periods = []
      periods_1.each do |p1|
        periods_2.each do |p2|
          next if p2[1]<=p1[0]
          break if p1[1]<=p2[0]
          start_at = [p1[0], p2[0]].max
          end_at = [p1[1],p2[1]].min
          periods << [start_at, end_at]
        end
      end
      periods
    end

  end

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
    return nil if until_at.nil? || end_at.nil?
    
    begin_at_i = begin_at.to_i
    start_at_i = start_at.to_i
    end_at_i = end_at.to_i
    until_at_i = until_at.to_i
    return nil if begin_at_i>until_at_i || start_at_i>end_at_i

    # single event
    if !is_recurrent?
      real_start_at_i = [begin_at_i, start_at_i].max
      real_end_at_i = [until_at_i, end_at_i].min
      return [] if real_start_at_i > real_end_at_i
      return [[real_start_at_i, real_end_at_i]]
    end

    # recurrence events
    duration_i = end_at_i - start_at_i    
    interval_i = recurrence_year.year.to_i + recurrence_month.month.to_i + recurrence_day.day.to_i + recurrence_hour.hour.to_i + recurrence_minute.minute.to_i
    distance_i = interval_i - duration_i
    periods = []

    real_begin_at_i = [start_at_i, begin_at_i].max
    real_until_at_i = recurrence_end_at.nil? ? until_at_i : [until_at_i, recurrence_end_at.to_i].min
    return [] if real_begin_at_i > real_until_at_i

    remainder = (real_begin_at_i-start_at_i)%interval_i
    real_start_at_i = remainder <= duration_i ? real_begin_at_i : real_begin_at_i + interval_i - remainder
    start_at_i = real_start_at_i

    while start_at_i < real_until_at_i
      end_at_i = [start_at_i+duration_i, real_until_at_i].min
      periods << [start_at_i, end_at_i]
      start_at_i = end_at_i+distance_i
    end
    periods
  end

  def overlapping_periods(event, begin_at=start_at, until_at = (is_recurrent? ? recurrence_end_at||begin_at+1.year : end_at||begin_at+1.year) )
    periods_1 = self.to_i_periods(begin_at, until_at).to_a
    periods_2 = event.to_i_periods(begin_at, until_at).to_a
    Event.periods_intersection(periods_1,periods_2)
  end
  
end

