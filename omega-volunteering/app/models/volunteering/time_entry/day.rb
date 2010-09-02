class Volunteering::TimeEntry::Day < ActiveRecord::Base

  belongs_to :time_entry

#  validates_format_of :time_entry, :with => /^[0-23]+\.[0-9]{2}$/

  validates :hours, :inclusion => { :in => 0.5...23.60, :message => "must be between 0.4 and 23.60" },
                    :numericality => true,
                    :allow_nil => true

  
end