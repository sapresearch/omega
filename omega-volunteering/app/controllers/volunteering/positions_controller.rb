class Volunteering::PositionsController < ApplicationController
  respond_to :html, :xml, :json, :js
  require_permission Volunteering::PERM_VIEW
  require_permission Volunteering::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]

  before_filter :get_positions, :only => [:index, :upcoming, :skills, :interests]
  before_filter :get_skills, :only => [:index, :upcoming, :skills,]
  before_filter :get_interests, :only => [:index, :upcoming, :interests]
  before_filter :sort, :only => [:index]

  def index
    respond_with(@positions)
  end

  def upcoming
    @positions = @positions.where('start is not null').order('start ASC')
    respond_with(@positions)
  end

  def show
    @position = Volunteering::Position.find(params[:id])
    respond_with(@position)
  end

  def edit
    @position = Volunteering::Position.find(params[:id])
    respond_with(@position)
  end

  def new
    @position = Volunteering::Position.new
    @position.contacts.build do |c|
      c.phone_numbers.build
    end
    schedule = @position.build_schedule
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].each do |day|
      schedule.days.build(:day => day)
    end
    @position.interests.build
    @position.skills.build
  end


  def scheduler
    @position = Volunteering::Position.new
    @position.build_contact.phone_numbers.build
    schedule = @position.build_schedule
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].each do |day|
      schedule.days.build(:day => day)
    end
  end

  def create
    case params[:contact_assignment]
      when 'none'
        params[:volunteering_position].delete(:contact_ids)
        params[:volunteering_position].delete(:contacts_attributes)
      when 'existing'
        params[:volunteering_position].delete(:contacts_attributes)
      when 'new'
        params[:volunteering_position].delete(:contact_ids)
    end

    if contact_ids = params[:volunteering_position][:contact_ids]
      params[:volunteering_position][:contact_ids] = contact_ids.split(',')
    end

    if schedule = params[:volunteering_position].delete(:schedule_attributes)
      case schedule[:schedule_type]
        when 'daily'
          params[:volunteering_position][:schedule_attributes] = schedule[:daily]
          params[:volunteering_position][:schedule_attributes][:schedule_type] = 'daily'

          if params[:daily_type] == 'every_week_day'
            params[:volunteering_position][:schedule_attributes][:every_value] = 'weekday'
          end

        when 'weekly'
          params[:volunteering_position][:schedule_attributes] = schedule[:weekly]
          params[:volunteering_position][:schedule_attributes][:schedule_type] = 'weekly'
          params[:volunteering_position][:schedule_attributes][:start_time] = "00:00"
          params[:volunteering_position][:schedule_attributes][:end_time] = "00:00"
      end
    end

    @position = Volunteering::Position.create(params[:volunteering_position])

    @position.starttime_nr = params[:starttime_nr]
    @position.start_date_nr = params[:start_date_nr]
    @position.endtime_nr = params[:endtime_nr]
    @position.end_date_nr = params[:end_date_nr]
    respond_with(@position)
  end

  def update
    @position = Volunteering::Position.find(params[:id])
    respond_with(@position)
  end

  def skills
    render :index
  end

  def interests
    render :index
  end

   def my_positions

    @positions = Array.new
    
    @records = Volunteering::Record.find_all_by_contact_id(Contact.for(current_user))
    @records.each do |r|
      @positions << Volunteering::Position.find_by_id(r.position_id)
    end
     
  end

  def my_time_sheets

      @entry_days = Volunteering::TimeEntry::Day.all
      
      @timesheets = Array.new

      @records = Volunteering::Record.find_all_by_contact_id(Contact.for(current_user))
      @records.each do |r|
        @timesheets << Volunteering::TimeEntry.find_all_by_record_id(r.id)
      end
      
  end

  
  private
  def get_positions
    @positions = Volunteering::Position.includes(:skills)
    @positions = @positions.started.not_ended

    if skills = params[:skills].try(:split, '+')
      @positions = @positions.select('`volunteering_positions`.*, count(`contact_skills`.`id`) as s_count').
              joins(:skills).
              where('contact_skills.name IN (?)', skills).
              group("`volunteering_positions`.`id` HAVING `s_count` = #{skills.size}")
    end

    if interests = params[:interests].try(:split, '+')
      @positions = @positions.select('`volunteering_positions`.*, count(`contact_interests`.`id`) as i_count').
              joins(:interests).
              where('contact_interests.name IN (?)', interests).
              group("`volunteering_positions`.`id` HAVING `i_count` = #{interests.size}")
    end
  end

  def get_skills
    @skills = Volunteering::Position.where(:id => @positions.map(&:id)).
            joins(:skills).
            group('contact_skills.name').
            select('contact_skills.*, count(*) AS count').
            order('count desc')

    if @skills_tags = params[:skills].try(:split, '+')
      @skills_tags.each do |skill|
        @skills = @skills.where('contact_skills.name != ?', skill)
      end
    end
  end

  def get_interests
    @interests = @positions.where(:id => @positions.map(&:id)).
            joins(:interests).
            group('contact_interests.name').
            select('contact_interests.*, count(*) as count').
            order('count desc')

    if @interests_tags = params[:interests].try(:split, '+')
      @interests_tags.each do |interest|
        @interests = @interests.where('contact_interests.name != ?', interest)
      end
    end
  end




  
  SORT_KEYS = ['name']
  SORT_DIRECTIONS = ['asc', 'desc']

  def sort
    @positions = Volunteering::Position.scoped

    params.each do |attr, direction|
      next unless SORT_KEYS.include?(attr) and SORT_DIRECTIONS.include?(direction)
      @positions = @positions.order("#{attr} #{direction}")
    end
  end

end
