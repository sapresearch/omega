class Volunteering::DaysController < Omega::Controller
  respond_to :html, :xml, :json, :js
  require_permission Volunteering::PERM_VIEW
  require_permission Volunteering::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]

  def index
      @days = Volunteering::Schedule::Day.all
      respond_with(@days)
    end

    def show
      @day = Volunteering::Schedule::Day.find(params[:id])
      respond_with(@day)
    end

    def new
      @day = Volunteering::Schedule::Day.new
      respond_with(@day)
    end

    def edit
      @day = Volunteering::Schedule::Day.find(params[:id])
      respond_with(@day)
    end

    def create
      @day = Volunteering::Schedule::Day.create(params[:volunteering_schedule_day])
      respond_with(@day)
    end

    def update
      @day = Volunteering::Schedule::Day.find(params[:id])
      respond_with(@day)
    end

    def destroy
      @day = Volunteering::Schedule::Day.find(params[:id])
      @day.destroy
           
    end
  end
