class Service::Type < ActiveRecord::Base

  has_many :typefields, :dependent => :destroy
  
end
