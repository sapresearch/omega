class Service::Detail < ActiveRecord::Base

  belongs_to :service  
  has_many :fieldvalues, :as => :detail, :dependent => :destroy

  accepts_nested_attributes_for :fieldvalues


end
