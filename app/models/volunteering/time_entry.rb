module Omega
	class Volunteering::TimeEntry < Model
	
		belongs_to :record
		has_many :days, :class_name => '::Volunteering::TimeEntry::Day', :dependent => :destroy
		validates_uniqueness_of :record_id, :scope => :week
		accepts_nested_attributes_for :days
	
		class << self
			def find_by_contact(contact_id)
				self.all.select { |entry| entry.record.contact.id == contact_id }
			end
		
		 	def find_by_week_and_record(week, record)
				time_entries = self.where('week = ?', week)
				time_entries.select! { |entry| entry.record.id == record.id }
				time_entries.empty? ? nil : time_entries.at(0)
			end
		end
	
	end
end
