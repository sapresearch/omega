class Volunteering::Position < ActiveRecord::Base

  MAX_POSITIONS_PER_PAGE = 4

  has_many :contact_positions
  has_many :contacts, :through => :contact_positions

#  belongs_to :contact
  has_many :records
  has_one :schedule
  
  has_and_belongs_to_many :skills,    :class_name => '::Contact::Skill',
                                      :join_table => 'contact_skills_volunteering_positions'
                                     
  has_and_belongs_to_many :interests, :class_name => '::Contact::Interest',
                                      :join_table => 'contact_interests_volunteering_positions'

  accepts_flattened_values_for :skills, :interests, :value => :name
  accepts_nested_attributes_for :schedule
  accepts_nested_attributes_for :contacts

  attr_accessor :starttime_nr, :start_date_nr, :endtime_nr, :end_date_nr

  scope :started, where('start <= ?', Time.now)
  scope :not_started, where('start > ?', Time.now)
  scope :ended, where('end <= ?', Time.now)
  scope :not_ended, where('end > ?', Time.now)

  before_save :combine_times

  validates :name, :description, :hours, :start, :end, :volunteers_required, :presence => true


  def to_s
    "Volunteering Position: #{name}"
  end

  def to_param
    "#{id}-#{name.parameterize}"
  end

  private
    def combine_times
      self.start = start_date_nr + " " + starttime_nr
      self.end = end_date_nr + " " + endtime_nr 
    end
  
end
