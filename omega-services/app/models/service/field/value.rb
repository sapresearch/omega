class Service::Field::Value < ActiveRecord::Base

  belongs_to :service
  belongs_to :field

end
