class ServiceRegistration < ActiveRecord::Base
  # app-spec
  belongs_to :contact
  # end app-spec
  belongs_to :service_leaf
  
  def service
    service_leaf.service
  end
end
