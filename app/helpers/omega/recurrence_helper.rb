module Omega
	module RecurrenceHelper
	  def recurrence(builder, hidden)
	    render('shared/recurrence', :builder => builder, :hidden => hidden )
	  end
	end
end
