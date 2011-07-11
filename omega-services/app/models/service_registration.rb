class ServiceRegistration < ActiveRecord::Base
  # app-spec
  belongs_to :contact
  # end app-spec
  belongs_to :service_leaf
  has_one :service_registration_form_value
  
  def service
    service_leaf.service
  end

end
