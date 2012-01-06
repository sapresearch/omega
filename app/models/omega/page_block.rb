module Omega
	class PageBlock < Omega::Model
	  belongs_to :page
	  belongs_to :block
	end
end
