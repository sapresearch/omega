	class Volunteering::Record < Model
	
	  MAX_RECORDS_PER_PAGE = 100
	
	  belongs_to  :position, :inverse_of => :records
	  belongs_to  :contact
	  has_many    :time_entries, :dependent => :destroy
	  
	  before_validation( :on => :create) do
		 self.status = "Applied"
	  end
	
	  default_scope order('created_at desc')
	
	  validate :contact_has_only_one_record_per_position
	  #validates :status, :presence => true,
	                     #:inclusion => { :in => [:applied, :declined, :accepted] }
		def contact_has_only_one_record_per_position
			self.errors.clear
			if self.new_record?
				contact_records = Volunteering::Record.where('contact_id = ?', self.contact_id)
				contact_records.each { |r| contact_records.delete(r) if r.id == self.id }
				records_for_this_position = contact_records.select { |r| r.position_id == self.position_id }
				if records_for_this_position.count > 0
					self.errors.add :contact_id, 'This user already has a record for this position.'
				end
			end
		end
	
	
		class << self
			def for(user)
				Volunteering::Record.all.select { |vr| !vr.contact.nil? }.select { |vr| vr.contact.user == user and vr.status != "Rejected" }
			end
	
			def sort_by_selected_position(records, record_id)
				return records if record_id.nil?
				record_id = record_id.to_i
				sorted_records = records.select { |r| r.id == record_id }
				records.each { |r| sorted_records << r unless r.id == record_id }
				sorted_records
			end

			def find_by_contact_and_position(contact, position)
				records = Volunteering::Record.all
				records.select! { |r| r.contact.id == contact.id and r.position.id == position.id }
				records.empty? ? nil : records.at(0)
			end
		end
	
	
		def position_name
			self.position.name
		end
	
	end
