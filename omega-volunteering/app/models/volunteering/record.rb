class Volunteering::Record < Omega::Model

  MAX_RECORDS_PER_PAGE = 100

  belongs_to  :position, :inverse_of => :records
  belongs_to  :contact, :validate => false
  has_many    :time_entries

  before_validation( :on => :create) do
      self.status = "Applied"
  end

  default_scope order('created_at desc')

  accepts_nested_attributes_for :contact

  before_validation(:on => :create) do
      self.status = "Applied"
  end


  #validates :status, :presence => true,
                     #:inclusion => { :in => [:applied, :declined, :accepted] }
end
