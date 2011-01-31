class Service::TypeField::Value < ActiveRecord::Base

  belongs_to :type
  belongs_to :type_field

end
