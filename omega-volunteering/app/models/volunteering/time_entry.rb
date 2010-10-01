class Volunteering::TimeEntry < Omega::Model

  belongs_to :record

  has_many :days, :class_name => '::Volunteering::TimeEntry::Day'

  validates_uniqueness_of :record_id, :scope => :week

  accepts_nested_attributes_for :days

  
end
