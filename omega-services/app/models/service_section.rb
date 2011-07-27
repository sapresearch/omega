class ServiceSection < ActiveRecord::Base
  # app-spec
  belongs_to :contact
  # end app-spec
  belongs_to :service_leaf
  belongs_to :event

  def service
    service_leaf.service
  end

end
