class Contact::Address < ActiveRecord::Base
  ADDRESS_TYPES = %w{home work billing}

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
