module Omega
	class Component < ActiveRecord::Base
	end
	
	class HtmlComponent < Component
	  def self.model_name
	    superclass.model_name
	  end
	end
end
