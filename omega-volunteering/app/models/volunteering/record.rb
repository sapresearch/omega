class Volunteering::Record < ActiveRecord::Base
  belongs_to :position
  belongs_to :contact
  has_many :time_entries

  validates :status, :presence => true,
                     :inclusion => { :in => [:applied, :declined, :accepted] }
end
