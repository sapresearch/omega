module Omega
	class Calendar::Share < Model
	  belongs_to :calendar
	  belongs_to :shared_to, :class_name => "User"
	
	  scope :readable, where(:readable => true)
	  scope :writable, where(:writable => true)
	end
end
