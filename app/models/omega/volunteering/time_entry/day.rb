module Omega
	class Volunteering::TimeEntry::Day < Model
	
	  belongs_to :time_entry
	
	#  validates_format_of :time_entry, :with => /^[0-23]+\.[0-9]{2}$/
	
	  validates :hours, :inclusion => { :in => 0.5...23.5, :message => "must be between 0.4 and 23.5" },
	                    :numericality => true,
	                    :allow_nil => true
	
	  
	end
end
