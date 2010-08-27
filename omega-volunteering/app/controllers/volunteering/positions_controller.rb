class Volunteering::PositionsController < ApplicationController
  respond_to :html, :xml, :json, :js
  require_permission Volunteering::PERM_VIEW
  require_permission Volunteering::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]

  before_filter :sort, :only => [:index]

  def index
    respond_with(@positions)
  end

  def upcoming
    @positions = Volunteering::Position.where('start is not null').order('start ASC')
    respond_with(@positions)
  end

  def show
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

            if params[:daily_type] == 'every_week_day'
                params[:volunteering_position][:schedule_attributes][:every_value] = 'weekday'
            end
         
          when 'weekly'
            params[:volunteering_position][:schedule_attributes] = schedule[:weekly]
            params[:volunteering_position][:schedule_attributes][:start_time] = "00:00"
            params[:volunteering_position][:schedule_attributes][:end_time] = "00:00"
        end

        params[:volunteering_position][:schedule_attributes][:schedule_type] = schedule[:schedule_type]
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


  private
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
