	class Volunteering::Position < Model
	  include Calendar::Recurrence
	
	  MAX_POSITIONS_PER_PAGE = 5
	
	  has_many :contact_positions
	  has_and_belongs_to_many :contact_fields, :class_name => '::Contact::Field',
	  														 :join_table => 'contact_fields_volunteering_positions',
															 :foreign_key => :volunteering_position_id,
															 :association_foreign_key => :contact_field_id
	
	  has_many :contacts, :through => :contact_positions
	  
	#  belongs_to :contact
	  has_many :records, :dependent => :destroy, :inverse_of => :position
	  has_one :schedule
	
	  has_one :event_source, :as => :source, :class_name => '::Calendar::EventSource'
	  accepts_nested_attributes_for :event_source
	  
	  has_and_belongs_to_many :skills,    :class_name => 'Contact::Skill',
	                                      :join_table => 'contact_skills_volunteering_positions'
	                                     
	  has_and_belongs_to_many :interests, :class_name => 'Contact::Interest',
	                                      :join_table => 'contact_interests_volunteering_positions'
	
		accepts_flattened_values_for :skills, :interests, :value => :name
	  accepts_nested_attributes_for :schedule, :reject_if => proc { |att| att['start_time'].blank? }
	  accepts_nested_attributes_for :contacts
	
	#  attr_accessor :starttime_nr, :start_date_nr, :endtime_nr, :end_date_nr
	#
	#  before_save :combine_times
	
	#-------------------------------------------------------------------------------------------------
	
		validate :valid_dates
		validates_unique :name # Custom validation. See model.rb
		validates_presence_of :description, :volunteers_required, :name
		validates_numericality_of :volunteers_required, :only_integer => true, :greater_than => 0
		validates_presence_of :start, :end, :unless => :recurrent?
	
		def valid_dates
			self.errors.clear
			if !recurrent
				return 
				if start_time.nil? or end_time.nil?
					return self.errors.add :start_time, " The start time and end time must be filled in."
				end
				if start_time >= end_time
					self.errors.add :start_time, " The start time, #{start_time}, has to be before end time, #{end_time} "
				end
			elsif recurrent
				if recurrence_start_time.nil? or recurrence_end_time.nil?
					return self.errors.add :recurrence_start_time, " The start time and end time must be filled in."
				end
				if recurrence_start_time >= recurrence_end_time
					self.errors.add :recurrence_start_time, " #{recurrence_start_time} has to be before end time, which is #{recurrence_end_time}"
				end
			end
		end
	
	#-------------------------------------------------------------------------------------------------
	
	  def active_volunteers
	    records.includes(:contact).where('action = ?', 'Accepted').collect(&:contact)
	  end
	
	  def unrejected_volunteers
	    records.includes(:contact).select { |r| r.action != 'Rejected' }
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
	    # self.end = "#{value} #{end_time}"
	    # FIXME!!!!!!
	    self.end = "#{start_date} #{end_time}"
	  end
	
	  def end_time
	    self.end.try(:to_s, :time)
	  end
	
	  def end_time=(value)
	    # self.end = "#{end_date} #{value}"
	    # FIXME!!!!!!
	    self.end = "#{start_date} #{value}"
	  end
	
	  def correct_end_date
	  	s = self.start
	  	e = self.end
		s_mins = (s.hour * 60) + s.min
		e_mins = (e.hour * 60) + e.min
		difference_in_seconds = 60 * (e_mins - s_mins)
		s + difference_in_seconds
	  end

    def duration
      return self.end-self.start if not recurrent
	  	return next_recurrence.to_time.to_i - recurrence_start.to_time.to_i if recurrent
    end

		def next_occurence
			recurrent ? next_recurrence : start
		end

		def next_recurrence
			recur = recurrences
			recur.each do |r|
				return r if r >= Date.today
			end
			recur.last # Return last event if no recurrence happens after today
		end

		# return an array of all recurrences
		def recurrences
			recurrence_end_on == 'number' ? recurrences_for_end_number : recurrences_for_end_date
		end

		def recurrences_for_end_date
			all = [recurrence_start]
			case recurrence_pattern
				when 'weekly'
					until recurrence_end_at < (all.last + 7)
						all << (all.last + 7)
					end
				when 'monthly'
					until recurrence_end_at < (all.last >> 7)
						all << (all.last >> 1)
					end
				when 'yearly'
					until recurrence_end_at < (all.last >> 12)
						all << (all.last >> 12)
					end
			end
			all
		end

		def recurrences_for_end_number
			all = [recurrence_start]
			case recurrence_pattern
				when 'weekly'
					(recurrence_end_after - 1).times do
						all << (all.last + 7)
					end
				when 'monthly'
					(recurrence_end_after - 1).times do
						all << (all.last >> 1)
					end
				when 'yearly'
					(recurrence_end_after - 1).times do
						all << (all.last >> 12)
					end
			end
			all
		end


		class << self

			# Return all positions that haven't already passed.
			def active
				all.select { |vp| vp.next_occurence.to_date >= Date.today }
			end

			def rank
				positions = active
				time_weight = 1.5
				priority_scores = { 'Urgent!' => 1.0, 'High' => 0.5, 'Normal' => 0.0 }
				time_rank = positions.sort_by { |vp| vp.next_occurence.to_date }.reverse
				scores = {}
				c = count.to_f - 1
				time_rank.each_with_index do |vp, i|
					normalized = (i/c * time_weight)
					priority = (priority_scores[vp.priority] or 0.0)
					scores[vp] = (normalized + priority)
				end
				scores = scores.sort_by { |k,v| v }.reverse
				scores.inject([]) { |array, subarray| array << subarray.first }
			end

		end
	
	
	end
	
	class Volunteering::Position::CollectionWithAll
		def name
			"All Positions"
		end
	
		def id
			Volunteering::Position.find(:all).collect { |vp| vp.id }.join(',')
		end
	end
	
	class Volunteering::Position::CollectionWithCurrentPosition
		def name
			"This Position Only"
		end
	
		def id
			0
		end
	end
