class Volunteering::PositionsController < ApplicationController
  respond_to :html, :xml, :json, :js
  require_permission Volunteering::PERM_VIEW
  require_permission Volunteering::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]

  
  def index
      @volunteering_positions = Volunteering::Position.all
      respond_with(@volunteering_positions)
    end

    def show
      @position = Volunteering::Position.find(params[:id])
      respond_with(@position)
    end

    def new
      @position = Volunteering::Position.new
      @position.build_contact.phone_numbers.build
      schedule = @position.build_schedule
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].each do |day|
        schedule.days.build(:day => day)
      end
      @position.interests.build
      @position.skills.build    
    end

    def edit
      @position = Volunteering::Position.find(params[:id])
      respond_with(@position)
    end

    def create
      @position = Volunteering::Position.create(params[:volunteering_position])
      @position.start_time = params[:start_time]
      @position.start_date = params[:start_date]
      @position.end_time = params[:end_time]
      @position.end_date = params[:end_date]
      @position.save!
      respond_with(@position)
    end

    def update
      @position = Volunteering::Position.find(params[:id])
      respond_with(@position)
    end

    def destroy
      @position = Volunteering::Position.find(params[:id])
      @position.destroy
           
    end
  end
