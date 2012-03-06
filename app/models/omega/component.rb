module Omega
	class Component < Model
	end
	
	class HtmlComponent < Component
	  def self.model_name
	    superclass.model_name
	  end
	end
end
