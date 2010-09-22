class Service::Registration < ActiveRecord::Base

  belongs_to :service  
  has_many :fieldvalues, :dependent => :destroy

  accepts_nested_attributes_for :fieldvalues


end
