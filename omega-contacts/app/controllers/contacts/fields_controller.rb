class Contacts::FieldsController < Omega::Controller

	def new
		@fields = Contact::Field.find(:all)
		@new_field = Contact::Field.new
	end

	def create
		Contact::Field.create(params[:contact_field])
		redirect_to(new_contact_field_path)
	end

end
