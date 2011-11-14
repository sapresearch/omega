class Contact::Address < Omega::Model
  ADDRESS_TYPES = %w{Home Work}

  belongs_to :contact, :polymorphic => true

  validates :city, :presence => true
  validates :zip_code, :presence => true

  attr_accessible :address_type, :street, :unit_apt_number, :city, :state, :zip_code, :country

	def self.update_addresses(params)
		if not params[:addresses_attributes].nil?
			params[:addresses_attributes].each_value do |address|
				if not address[:id].nil?
					self.find(address[:id]).update_attributes(address)
				end
			end
		end
	end
end
