class Volunteering::PositionsController < ApplicationController
  respond_to :html, :xml, :json, :js
  
  require_permission Volunteering::PERM_VIEW
  require_permission Volunteering::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]

  before_filter :get_positions, :only => [:index, :upcoming, :skills, :interests]
  before_filter :get_my_positions, :only => [:my_positions]
  before_filter :get_skills, :only => [:index, :upcoming, :skills, :my_positions]
  before_filter :get_interests, :only => [:index, :upcoming, :interests, :my_positions]
  before_filter :sort, :only => [:index]

  breadcrumb 'Volunteering' => :volunteering
  breadcrumb 'Positions' => :volunteering_positions

  def index
    @positions = @positions.paginate(:page => params[:page], :per_page => Volunteering::Position::MAX_POSITIONS_PER_PAGE)
    respond_with(@positions)
  end

  def upcoming
    @positions = @positions.where('start is not null').order('start ASC')
    @positions = @positions.paginate(:page => params[:page], :per_page => Volunteering::Position::MAX_POSITIONS_PER_PAGE)
     breadcrumb 'Upcoming Positions' => :upcoming_volunteering_positions
    respond_with(@positions)
  end

  def show
    @position = Volunteering::Position.find(params[:id])
    breadcrumb @position.name => volunteering_position_path(@position)
    respond_with(@position)
  end

  def edit
    @position = Volunteering::Position.find(params[:id])
    fix_model_to_view
    respond_with(@position)
  end

  def new
    @position = Volunteering::Position.new
    fix_model_to_view
    respond_with(@position)
  end

  def create
    fix_view_to_model
    @position = Volunteering::Position.create(params[:volunteering_position])
    fix_model_to_view

    @position.starttime_nr = params[:starttime_nr]
    @position.start_date_nr = params[:start_date_nr]
    @position.endtime_nr = params[:endtime_nr]
    @position.end_date_nr = params[:end_date_nr]
    respond_with(@position)
  end

  def update
    fix_view_to_model
    @position = Volunteering::Position.find(params[:id])
    @position.update_attributes(params[:volunteering_position])
    fix_model_to_view
    respond_with(@position)
  end

  def skills
    @positions = @positions.paginate(:page => params[:page], :per_page => Volunteering::Position::MAX_POSITIONS_PER_PAGE)
    render :index
  end

  def interests
    @positions = @positions.paginate(:page => params[:page], :per_page => Volunteering::Position::MAX_POSITIONS_PER_PAGE)
    render :index
  end

   def my_positions
     breadcrumb 'My Positions' => :my_positions_volunteering_positions
     respond_with(@positions)
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
    @positions = Volunteering::Position.includes(:skills, :records)

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

  def get_my_positions
    @positions = Volunteering::Position.joins(:records).where('volunteering_records.contact_id = ?', Contact.for(current_user))
  end

  def get_skills
    @skills = Volunteering::Position.where(:id => @positions.map(&:id)).
            joins(:skills).
            group('contact_skills.name').
            select('contact_skills.*, count(*) AS count').
            order('count desc').limit(20)

    if @skills_tags = params[:skills].try(:split, '+')
      @skills_tags.each do |skill|
        @skills = @skills.where('contact_skills.name != ?', skill)
      end
    end
  end

  def get_interests
    @interests = Volunteering::Position.where(:id => @positions.map(&:id)).
            joins(:interests).
            group('contact_interests.name').
            select('contact_interests.*, count(*) as count').
            order('count desc').limit(10)

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

  def fix_view_to_model
    case params[:contact_assignment]
      when 'existing'
        params[:volunteering_position].delete(:contacts_attributes)
      when 'new'
        params[:volunteering_position].delete(:contact_ids)
      when 'none'
        params[:volunteering_position].delete(:contact_ids)
        params[:volunteering_position].delete(:contacts_attributes)
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
            params[:volunteering_position][:schedule_attributes][:value] = 'weekday'
          end

        when 'weekly'
          params[:volunteering_position][:schedule_attributes] = schedule[:weekly]
          params[:volunteering_position][:schedule_attributes][:schedule_type] = 'weekly'
          params[:volunteering_position][:schedule_attributes][:start_time] = "00:00"
          params[:volunteering_position][:schedule_attributes][:end_time] = "00:00"
      end
    end
  end

  def fix_model_to_view
    @position.contacts.build do |c|
      c.phone_numbers.build
    end if @position.contacts.empty?

    @position.build_schedule unless @position.schedule

    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].each do |day|
      @position.schedule.days.build(:day => day) unless @position.schedule.days.any? { |d| d.day == day }
    end
  end
end
