class Service::Fieldvalue < ActiveRecord::Base

  belongs_to :registration
  belongs_to :field

  validates_presence_of :field_value


end
