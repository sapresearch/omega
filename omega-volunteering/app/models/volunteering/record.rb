class Volunteering::Record < Omega::Model

  MAX_RECORDS_PER_PAGE = 100

  belongs_to  :position, :inverse_of => :records
  belongs_to  :contact
  has_many    :time_entries, :dependent => :destroy
          
  
  before_validation( :on => :create) do
      self.status = "Applied"
  end

  default_scope order('created_at desc')


  before_validation(:on => :create) do
      self.status = "Applied"
  end

	class << self
		def for(user)
			Volunteering::Record.all.select { |vr| vr.contact.user == user and vr.status != "Rejected" }
		end

		def sort_by_selected_position(array_of_records, position_id)
			return array_of_records if position_id.nil?
			array_of_records.each do |r|
				if r.position.id == position_id.to_i
					array_of_records.delete(r)
					array_of_records.unshift(r)
				end
			end
			array_of_records
		end
	end


	def position_name
		self.position.name
	end

  #validates :status, :presence => true,
                     #:inclusion => { :in => [:applied, :declined, :accepted] }
                     
  #accepts_nested_attributes_for :contact
  
end
