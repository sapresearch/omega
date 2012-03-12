module Omega
	class Contacts::FieldsController < Controller
	
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
	
		def edit
			@field = Contact::Field.find(params[:id])
			@positions = Volunteering::Position.find(:all).unshift(Volunteering::Position::CollectionWithAll.new)
		end
	
		def update
			@field = Contact::Field.find(params[:id])
			@field.update_attributes(params[:contact_field])
			@field.update_positions(params[:volunteering_position][:contact_field_volunteering_position_id])
			redirect_to(new_contact_field_path)
		end
		
		def destroy
			puts "\n\nIn fields#destory"
			@field = Contact::Field.find(params[:id])
			@field.destroy
			redirect_to(new_contact_field_path)
		end
			
	end
end
