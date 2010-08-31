class Volunteering::ContactPosition < ActiveRecord::Base

  belongs_to :contact
  belongs_to :position
  

end
