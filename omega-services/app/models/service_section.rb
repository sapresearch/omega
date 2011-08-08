class ServiceSection < ActiveRecord::Base
  # app-spec
  belongs_to :contact
  # end app-spec
  belongs_to :service_leaf
  belongs_to :service
  belongs_to :event, :dependent => :destroy

  accepts_nested_attributes_for :event

  def service
    service_leaf.service
  end

end
