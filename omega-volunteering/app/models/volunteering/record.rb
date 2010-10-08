class Volunteering::Record < Omega::Model
  belongs_to  :position
  belongs_to  :contact
  has_many    :time_entries

  accepts_nested_attributes_for :contact


  #validates :status, :presence => true,
                     #:inclusion => { :in => [:applied, :declined, :accepted] }
end
