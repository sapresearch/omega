class Volunteering::TimeEntry < ActiveRecord::Base

  belongs_to :record

   has_many :days, :class_name => '::Volunteering::TimeEntry::Day'


   accepts_nested_attributes_for :days, :reject_if => proc { |att| att['hours'].blank? }

  
end
