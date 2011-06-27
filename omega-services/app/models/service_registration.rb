class ServiceRegistration < ActiveRecord::Base
  # app-spec
  belongs_to :contact
  # end app-spec
  belongs_to :service

end
