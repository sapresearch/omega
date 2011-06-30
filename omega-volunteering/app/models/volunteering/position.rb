module ActiveRecord
	module Validations
		module ClassMethods
		
			#----------------------------------------------------------
		 
			@@end_is_after_start_msg = 'The end hour must be after the start hour.'
			@@will_match_anything = /.*/
		
			#----------------------------------------------------------
		
			def validates_end_is_after_start(*attr_names)
		
				end_hour = attr_names[0].to_s
				start_hour = attr_names[1].to_s

				end_hour = /[0-9]{1,2}:00:00/.match(end_hour)
				start_hour = /[0-9]{1,2}:00:00/.match(start_hour)

				end_hour = end_hour.to_s.gsub(/:00:00/, "")
				start_hour = start_hour.to_s.gsub(/:00:00/, "")

				@@end_hour_msg = "End must be after the start hour"
		
				attr_names.pop

		    #if end_hour > start_hour then
		    if start_hour.to_i == 2 then
					configuration = {
						:message   => 'This should have worked',
						:with      => @@will_match_anything } # So that it matches anything and always validates.

					validates_format_of attr_names, configuration
	
		    #elsif end_hour < start_hour then
		    elsif end_hour.to_i == 1 then
					configuration = {
						:message   => "#{end_hour} is the end hour and #{start_hour} is the start hour hour hour",
						:with      => /thiswillnevermatch/ } # So that it matches anything and always validates.

					validates_format_of attr_names, configuration

				else
					configuration = {
						:message   => "didn't go into any loop",
						:with      => /thiswillnevermatch/ } # So that it matches anything and always validates.

					validates_format_of attr_names, configuration
				end
		
			#	configuration.update(attr_names.pop)# if attr_names.last.is_a?(Hash)
		
			end
						
		  #----------------------------------------------------------

		end
	end
end




class Volunteering::Position < Omega::Model
  include Calendar::Recurrence

  MAX_POSITIONS_PER_PAGE = 5

  has_many :contact_positions
  has_many :contacts, :through => :contact_positions
  
#  belongs_to :contact
  has_many :records, :dependent => :destroy, :inverse_of => :position
  has_one :schedule

  has_one :event_source, :as => :source, :class_name => '::Calendar::EventSource'
  accepts_nested_attributes_for :event_source
  
  has_and_belongs_to_many :skills,    :class_name => '::Contact::Skill',
                                      :join_table => 'contact_skills_volunteering_positions'
                                     
  has_and_belongs_to_many :interests, :class_name => '::Contact::Interest',
                                      :join_table => 'contact_interests_volunteering_positions'

  accepts_flattened_values_for :skills, :interests, :value => :name
  accepts_nested_attributes_for :schedule, :reject_if => proc { |att| att['start_time'].blank? }
  accepts_nested_attributes_for :contacts

#  attr_accessor :starttime_nr, :start_date_nr, :endtime_nr, :end_date_nr
#
#  before_save :combine_times

#-------------------------------------------------------------------------------------------------

  validates_presence_of :description, :volunteers_required, :skills, :interests, :name
	validates_numericality_of :volunteers_required, :only_integer => true, :greater_than => 0
  validates_uniqueness_of :name
  validates_presence_of :start, :end, :unless => :recurrent?
	validates_presence_of :agreement, :if => :disclaimer_agreement
	#validates_end_is_after_start :end, :start
	#validates :number, :format => {:with => %r{[-\.\(\)1-9]*}}

#-------------------------------------------------------------------------------------------------

  def active_volunteers
    records.includes(:contact).where('action = ?', 'Accepted').collect(&:contact)
  end

  def missing_volunteers
    volunteers_required - active_volunteers.count
  end


  def to_s
    "Volunteering Position: #{name}"
  end

  def to_param
    "#{id}-#{name.parameterize}"
  end

  def status_of(contact)
    if record = record_for(contact)
      :valid
    else
      :none
    end
  end

  def record_for(contact)
    contact.nil? ? nil : records.where('contact_id = ?', contact).first
  end

  def start_date
    start.try(:to_date)
  end

  def start_date=(value)
    self.start = "#{value} #{start_time}"
  end

  def start_time
    start.try(:to_s, :time)
  end

  def start_time=(value)
    self.start = "#{start_date} #{value}"
  end

  def end_date
    self.end.try(:to_date)
  end

  def end_date=(value)
    self.end = "#{value} #{end_time}"
  end

  def end_time
    self.end.try(:to_s, :time)
  end

  def end_time=(value)
    self.end = "#{end_date} #{value}"
  end
end
