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
  			                                                    	@entry.save 
  			                                                    else
  													                @entry = Volunteering::TimeEntry.find_by_record_id(entry["record_id"]) 
  													                @entry.update_attributes(:week => entry["week"], :days_attributes => entry["days_attributes"])
  														        end 
  														 }
  			
  	#	 @timesheets.each(&:save!) 
  		
  		
   	    redirect_to :root
    end
    
    def all_timesheets 
      
      @entries = Array.new
      
      @position = Volunteering::Position.find(params[:id])
      
      @records= Volunteering::Record.where('position_id = ?', @position.id)
      
      @records.each do |r|
        @entry = Volunteering::TimeEntry.new 
        @entry.record_id = r.id
              
       ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].each do |d|
       		@entry.days.build(:day => d)
      	end unless @entry =  Volunteering::TimeEntry.find_by_record_id(r.id)
       	
       @entries << @entry

      end  
      
     
      respond_with(@position)
      
      
    end
       
  end