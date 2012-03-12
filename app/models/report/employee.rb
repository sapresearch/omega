module Omega
	class Report::Employee
	  attr_accessor :name, :position_names, :jobs, :total_hours
	
	  def initialize(name="", jobs=[])
	    @name = name
	    @jobs = jobs
	  end
	
	end
end
