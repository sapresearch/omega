module Omega
	class Report::Position
	  attr_accessor :name, :employee_names, :jobs, :total_hours
	
	  def initialize(name="", jobs=[])
	    @name = name
	    @jobs = jobs
	  end
	
	end
end
