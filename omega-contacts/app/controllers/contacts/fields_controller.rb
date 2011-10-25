class Contacts::FieldsController < Omega::Controller

	def new
		@fields = Contact::Field.find(:all)
		@new_field = Contact::Field.new
		@positions = Volunteering::Position.find(:all).unshift(Volunteering::Position::CollectionWithAll.new)
	end

	def create
		@field = Contact::Field.create(params[:contact_field])
		@field.update_positions(params[:volunteering_position][:contact_field_volunteering_position_id])
		redirect_to(new_contact_field_path)
	end

	# Create an object with appropriate methods to include in the @positions collection for use in the collection_select helper in the fields/new view.
	class All
		def name
			"All Positions"
		end

		def id
			Volunteering::Position.find(:all).collect { |vp| vp.id }.join(',')
		end
	end

end
