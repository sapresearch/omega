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
  #    @entry = Volunteering::TimeEntry.create(params[:volunteering_time_entry])
  #    respond_with(@entry)
  		@timesheets = params[:entries].values.collect{ 	|entry| 
  			                                                    if Volunteering::TimeEntry.find_by_record_id(entry["record_id"]).nil?
  			                                                    	@entry = Volunteering::TimeEntry.new(entry) 
  			                                                    	@entry.save! 
  			                                                    else
  													                @entry = Volunteering::TimeEntry.find_by_record_id(entry["record_id"]) 
  													                @entry.update_attributes(:week => entry["week"], :days_attributes => entry["days_attributes"])
  														        end 
  														 }
  
   	    redirect_to :volunteering_positions
    end
    
    def all_timesheets 
      
      @entries = Array.new
      
      @position = Volunteering::Position.find(params[:id])
      
      start = Time.utc(@position.start.strftime('%Y-%m-%d %H:%M:%S'))
           
      @start = start - (start.wday-1)*24*60*60 - start.hour*60*60 - start.min*60 - start.sec

      @start = @start.strftime('%Y-%m-%d')
      
      @records = Volunteering::Record.where('action = ? and position_id = ?','Accepted',@position.id)
      
      @records.each do |r|
        @entry = Volunteering::TimeEntry.new 
        @entry.record_id = r.id
              
        if Volunteering::TimeEntry.find_by_record_id(r.id).nil?      
       		['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].each do |d|
       			@entry.days.build
      		end 
       	else
       		@entry = Volunteering::TimeEntry.find_by_record_id(r.id)
       	end
       	
       @entries << @entry

      end  
      
     
      respond_with(@position)
      
      
    end
       
  end