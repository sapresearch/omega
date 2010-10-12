class Volunteering::Record < Omega::Model

  MAX_RECORDS_PER_PAGE = 5

  belongs_to  :position
  belongs_to  :contact
  has_many    :time_entries

  default_scope order('created_at desc')

  accepts_nested_attributes_for :contact


  #validates :status, :presence => true,
                     #:inclusion => { :in => [:applied, :declined, :accepted] }
end
