module Omega
	class PageComponent < ActiveRecord::Base
	  belongs_to :page
	  belongs_to :component
	end
end
