class Contact::Value < Omega::Model
	has_one :contacts#, :join_table => 'contact_contacts_values'
	has_one :field

	attr_accessible :value, :field_id, :contact_id


	# Anytime update_attributes is called correctly covert the name. 
	# Anytime #create is called convert the name to lowercase.
	
	
	def convert(field_id, value)
		type = Contact::Field.find(field_id).data_type
		unless type.is_a?(String) and value.is_a?(String)
			case type
				when "True or False"
					value = value == true # Converts to boolean
				when "Integer"
					value = value.to_i
			end
		end
		value
	end
		

end
