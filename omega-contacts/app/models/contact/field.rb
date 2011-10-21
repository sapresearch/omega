class Contact::Field < Omega::Model
	has_many :values
	validates :name, :uniqueness => true,
						  :format => { :with => /\A\S*\z/, :message => "Only one word allowed in name" }

	def name_as_sym
		self.name.to_sym
	end

	# These names must correspond correctly with how users input data types in the view.
	def input_field
		type = self.data_type
		case type
			when "string"
				return :text_field
			when 'boolean'
				return :radio_button
			when 'integer'
				return :text_field
			else
				return :text_field
		end
	end

	# Convert data type to the way the user shoudl see it
	def data_type_to_human
		type = self.data_type
		case type
			when 'string'
				return 'Text'
			when 'boolean'
				return 'True/False'
			when 'integer'
				return 'Number'
		end
	end


end
