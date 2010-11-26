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

  validates :name, :description, :hours, :volunteers_required, :presence => true

  validates :start, :end, :presence => true,
                          :unless   => :recurrence?

  def active_volunteers
    records.includes(:contact).where('action = ?', 'Accept').collect(&:contact)
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
