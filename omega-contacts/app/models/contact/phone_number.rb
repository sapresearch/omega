class Contact::PhoneNumber < ActiveRecord::Base
  NUMBER_TYPES = %w{home work}

  belongs_to :contact, :polymorphic => true

  validates :number_type, :presence => true,
                          :inclusion => { :in => NUMBER_TYPES }
  validates :number,      :presence => true,
                          :phone_number => true
end
