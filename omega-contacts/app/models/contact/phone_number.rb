class Contact::PhoneNumber < Omega::Model
	NUMBER_TYPES = %w{Home Business Cell}

	belongs_to :contact, :polymorphic => true
	attr_accessible :number

	validates :number, :presence => true, :phone_number => true

	def self.update_phone_numbers(params)
		if not params[:phone_numbers_attributes].nil?
			params[:phone_numbers_attributes].each_value do |phone|
				self.find(phone[:id]).update_attributes(phone)
			end
		end
	end

end
