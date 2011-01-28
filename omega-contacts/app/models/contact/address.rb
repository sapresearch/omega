class Contact::Address < Omega::Model
  ADDRESS_TYPES = %w{Home Work}

  belongs_to :contact, :polymorphic => true

  validates :address_type, :presence => true,
                          :inclusion => { :in => ADDRESS_TYPES }
  validates :street,   :presence => true
  validates :city,     :presence => true
  validates :state,    :presence => true,
                       :state => true
  validates :zip_code, :presence => true,
                       :zip_code => true
  validates :country,  :presence => true,
                       :country => true
end
