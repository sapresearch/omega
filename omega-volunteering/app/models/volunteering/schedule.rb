class Volunteering::Schedule < ActiveRecord::Base

  belongs_to :position
  has_many :days, :dependent => :destroy

  accepts_nested_attributes_for :days, :reject_if => proc { |att| att['start_time'].blank? }
  
end