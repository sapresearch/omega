class Volunteering::Position < ActiveRecord::Base
  belongs_to :contact
  has_many :records
  has_one :schedule
  
  has_and_belongs_to_many :skills,    :class_name => '::Contact::Skill',
                                      :join_table => 'contact_skills_volunteering_positions'
                                     
  has_and_belongs_to_many :interests, :class_name => '::Contact::Interest',
                                      :join_table => 'contact_interests_volunteering_positions'

  accepts_flattened_values_for :skills, :interests, :value => :name
  accepts_nested_attributes_for :schedule, :contact

   attr_accessor :start_time, :start_date, :end_time, :end_date


  def before_save
    self.start = @start_date + " " + @start_time
    self.end = @end_date + " " + @end_time

  end
  
end
