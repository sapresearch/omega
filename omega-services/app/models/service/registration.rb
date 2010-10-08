class Service::Registration < ActiveRecord::Base

  belongs_to :service  
  has_many :fieldvalues, :dependent => :destroy
  belongs_to :contact

  accepts_nested_attributes_for :fieldvalues, :contact


end
