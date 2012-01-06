module Omega
	class PageBlock < ActiveRecord::Base
	  belongs_to :page
	  belongs_to :block
	end
end
