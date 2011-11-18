class Volunteering::TimeEntry < Omega::Model

	belongs_to :record
	has_many :days, :class_name => '::Volunteering::TimeEntry::Day', :dependent => :destroy
	validates_uniqueness_of :record_id, :scope => :week
	accepts_nested_attributes_for :days

	def self.find_by_contact(contact_id)
		self.all.select { |entry| entry.record.contact.id == contact_id }
	end
  
end
