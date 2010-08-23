class Volunteering::SchedulesController < ApplicationController
  respond_to :html, :xml, :json, :js
  require_permission Volunteering::PERM_VIEW
  require_permission Volunteering::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]

  def index
      @schedules = Volunteering::Schedule.all
      respond_with(@schedules)
    end

    def show
      @schedule = Volunteering::Schedule.find(params[:id])
      respond_with(@schedule)
    end

    def new
      @schedule = Volunteering::Schedule.new
      respond_with(@schedule)
    end

    def edit
      @schedule = Volunteering::Schedule.find(params[:id])
      respond_with(@schedule)
    end

    def create
      @schedule = Volunteering::Schedule.create(params[:volunteering_schedule])
      respond_with(@schedule)
    end

    def update
      @schedule = Volunteering::Schedule.find(params[:id])
      respond_with(@schedule)
    end

    def destroy
      @schedule = Volunteering::Schedule.find(params[:id])
      @schedule.destroy
           
    end
  end
