module Omega
	class PageComponent < Omega::Model
	  belongs_to :page
	  belongs_to :component
	end
end
