	class Event < Model
	  has_one :service_section, :dependent=>:destroy
	  has_one :event_recurrence, :dependent=>:destroy
	
	  MAX_RECURRENCE_COUNT = 500
	
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
	
	    # linear algorithm
	    def periods_union(periods_a)
	      # sanitize parameters
	      return nil unless periods_a.instance_of?(Array)
	      return periods_a.inject([]){|r, periods| Event.periods_union([r,periods])} if periods_a.length>2
	      periods_1 = periods_a[0]
	      periods_2 = periods_a[1]
	      flag_1 = periods_1.nil? || periods_1.empty?
	      flag_2 = periods_2.nil? || periods_2.empty?
	      return [] if flag_1 && flag_2
	      return periods_1 if flag_2
	      return periods_2 if flag_1
	      
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
	            (j...length_2).each{|k|periods << periods_2[k]}
	            break;
	          end
	        elsif p2[1]<p1[0]
	          periods << p2
	          j+=1
	          if j<length_2
	            p2 = periods_2[j]
	          else
	            (i...length_1).each{|k|periods << periods_1[k]}
	            break;
	          end
	        elsif p1[1]==p2[1] # this situation is rare, but process separately can slightly increase efficiency
	          periods << [[p1[0],p2[0]].min, p1[1]]
	          i+=1
	          j+=1
	          if i<length_1 && j<length_2
	            p1=periods_1[i]
	            p2=periods_2[j]
	          elsif i>=length_1
	            (j...length_2).each{|k|periods << periods_2[k]}
	            break;
	          elsif j>=length_2
	            (i...length_1).each{|k|periods << periods_1[k]}
	            break;
	          end
	        elsif p1[1]>p2[1]
	          j+=1
	          p1 = [[p1[0],p2[0]].min, p1[1]]
	          if j<length_2
	            p2 = periods_2[j]
	          else
	            periods << p1
	            ((i+1)...length_1).each{|k|periods << periods_1[k]}
	            break;
	          end
	        elsif p1[1]<p2[1]
	          i+=1
	          p2 = [[p1[0],p2[0]].min, p2[1]]
	          if i<length_1
	            p1 = periods_1[i]
	          else
	            periods << p2
	            ((j+1)...length_2).each{|k|periods << periods_2[k]}
	            break;
	          end
	        end
	      end
	      periods
	    end
	
	    # linear algorithm
	    def periods_intersection(periods_a)
	      # sanitize parameters
	      return nil unless periods_a.instance_of?(Array)
	      return periods_a.inject([]){|r, periods| Event.periods_intersection([r,periods])} if periods_a.length>2
	      periods_1 = periods_a[0]
	      periods_2 = periods_a[1]
	      flag_1 = periods_1.nil? || periods_1.empty?
	      flag_2 = periods_2.nil? || periods_2.empty?
	      return [] if flag_1 || flag_2
	      
	      periods = []
	      i=0;j=0
	      p1 = periods_1[i]
	      p2 = periods_2[j]
	      length_1 = periods_1.length
	      length_2 = periods_2.length
	
	      while true
	        if p1[1]<p2[0]
	          i+=1
	          break if i>=length_1
	          p1 = periods_1[i]
	        elsif p2[1]<p1[0]
	          j+=1
	          break if j>=length_2
	          p2 = periods_2[j]
	        elsif p1[1]==p2[1] # this situation is rare, but process separately can slightly increase efficiency
	          periods << [[p1[0],p2[0]].max, p1[1]]
	          i+=1
	          j+=1
	          break unless i<length_1 && j<length_2
	          p1=periods_1[i]
	          p2=periods_2[j]
	        elsif p1[1]<p2[1]
	          periods << [[p1[0],p2[0]].max, p1[1]]
	          i+=1
	          break unless i<length_1
	          p1 = periods_1[i]
	        elsif p1[1]>p2[1]
	          periods << [[p1[0],p2[0]].max, p2[1]]
	          j+=1
	          break unless j<length_2
	          p2 = periods_2[j]
	        end
	      end
	      periods
	    end
	
	  end
	
	  def is_undetermined?
	    start_at.nil?
	  end
	
	  def is_recurrent?
	    event_recurrence.nil? ? false : (recurrence_interval==0 ? false : true)
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
	
	  def recurrence_interval(start_at=Time.now)
	    return nil if event_recurrence.nil?
	    interval_values_hash = ActiveSupport::JSON.decode(event_recurrence.interval)
	    result = 0
	    interval_values_hash.each do |key,value|
	      case key
	        when "year"
            result += (start_at.advance(:years=>value.to_i)-start_at).to_i
	        when "month"
            result += (start_at.advance(:months=>value.to_i)-start_at).to_i
	          #result += value.to_i.month.to_i
	        when "day"
	          result += value.to_i.day.to_i
	        when "hour"
	          result += value.to_i.hour.to_i
	        when "minute"
	          result += value.to_i.minute.to_i
	      end
	    end
	    result
	  end
	
	  def recurrence_interval_s
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

	    if is_recurrent?
	      duration_i = end_at_i - start_at_i
	      interval_i = recurrence_interval
	      distance_i = interval_i - duration_i
	      periods = []
	    end
	
	    # single event
	    if interval_i.to_i==0
	      real_start_at_i = [begin_at_i, start_at_i].max
	      real_end_at_i = [until_at_i, end_at_i].min
	      return [] if real_start_at_i > real_end_at_i
	      return [[real_start_at_i, real_end_at_i]]
	    end
	
	    # recurrence events
	    real_begin_at_i = [start_at_i, begin_at_i].max
	    real_until_at_i = recurrence_end_at.nil? ? until_at_i : [until_at_i, recurrence_end_at.to_i].min
	    return [] if real_begin_at_i > real_until_at_i
	
	    remainder = (real_begin_at_i-start_at_i)%interval_i
	    real_start_at_i = remainder <= duration_i ? real_begin_at_i : real_begin_at_i + interval_i - remainder
	    start_at_i = real_start_at_i
	
	    count = 0
	    while start_at_i < real_until_at_i && count < Event::MAX_RECURRENCE_COUNT
	      end_at_i = [start_at_i+duration_i, real_until_at_i].min
	      periods << [start_at_i, end_at_i]
	      start_at_i = end_at_i+distance_i
	      count += 1
	    end
	    periods
	  end
	
	  def union_periods(event, begin_at=start_at, until_at = (is_recurrent? ? recurrence_end_at||begin_at+1.year : end_at||begin_at+1.year) )
	    periods_1 = self.to_i_periods(begin_at, until_at).to_a
	    periods_2 = event.to_i_periods(begin_at, until_at).to_a
	    Event.periods_union([periods_1,periods_2])
	  end
	
	  def intersection_periods(event, begin_at=start_at, until_at = (is_recurrent? ? recurrence_end_at||begin_at+1.year : end_at||begin_at+1.year) )
	    periods_1 = self.to_i_periods(begin_at, until_at).to_a
	    periods_2 = event.to_i_periods(begin_at, until_at).to_a
	    Event.periods_intersection([periods_1,periods_2])
	  end
	
	end
	
