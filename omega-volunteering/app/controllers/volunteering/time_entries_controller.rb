class Volunteering::TimeEntriesController < Omega::Controller

  respond_to :html, :xml, :json, :js

  PERM_RECORD_OWN_HOURS = 'users_view'

  breadcrumb 'Volunteering' => :volunteering
  breadcrumb 'Time Entries' => :my_time_sheets_volunteering_positions
  
    def show

      @entry = Volunteering::TimeEntry.find(params[:id])
      @entry_days = Volunteering::TimeEntry::Day.all

      breadcrumb 'Week ' + @entry.week.to_s => :volunteering_time_entries

      respond_with(@entry)
    end

    def new
      @entry = Volunteering::TimeEntry.new
      @entry.record = Volunteering::Record.find(params[:id])
      

      ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].each do |day|
        @entry.days.build(:day => day)
      end
      
      respond_with(@entry)

    end

    def create
      @entry = Volunteering::TimeEntry.create(params[:volunteering_time_entry])
      respond_with(@entry)
      
    end

    
  end