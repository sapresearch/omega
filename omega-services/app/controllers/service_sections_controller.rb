class ServiceSectionsController < Omega::Controller

  def new
    @service_section = ServiceSection.new
    @index = params[:index]
    @contacts = Contact.all.sort{|c1,c2|c1.name<=>c2.name}
  end

end

