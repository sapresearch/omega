class Contact::PhoneNumber < Omega::Model
  NUMBER_TYPES = %w{Home Business Cell}

  belongs_to :contact, :polymorphic => true

 # validates :number_type, :presence => true,
  #                        :inclusion => { :in => NUMBER_TYPES }
  validates :number,:presence => true, :phone_number => true
end
