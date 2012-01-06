module Omega
	class ServiceSectionsController < Omega::Controller
	
	  def new
	    @service_section = ServiceSection.new_with_dependency
	    @index = params[:index]
	    @contacts = Contact.all.sort{|c1,c2|c1.name<=>c2.name}
	  end
	
	end
	
end
