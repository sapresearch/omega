	class Report::Job
	  attr_accessor :position_name, :hour, :employee_name
	
	  def initialize(position_name=nil, hour=0, employee_name=nil)
	    @position_name = position_name
	    @hour = hour
	    @employee_name = employee_name
	  end
	  
	end
