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
    
    def new_timesheets
       	       	              
       @entries = Volunteering::TimeEntry.where('week = ?', params[:week])
       @records = Volunteering::Record.where('action = ? and position_id = ?','Accepted',params[:position])
       @start = params[:week]
       session[:week] = params[:week]

       if @entries.empty?
       
       		@entries = Array.new

       		@records.each do |r|
        		
        		@entry = Volunteering::TimeEntry.new 
        		@entry.record_id = r.id
              
#        		if Volunteering::TimeEntry.find_by_record_id(r.id).nil?      
       			['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].each do |d|
       				@entry.days.build
      		    end 
      		    
      		    @entries << @entry
      		end
       end
       
                    
         	
    end

    def create
  #    @entry = Volunteering::TimeEntry.create(params[:volunteering_time_entry])
  #    respond_with(@entry)
  		@timesheets = params[:entries].values.collect{ |entry| 
  			                                                    if Volunteering::TimeEntry.find_by_week_and_record_id(entry["week"],entry["record_id"]).nil?
  			                                                    	@entry = Volunteering::TimeEntry.new(entry) 
  			                                                    	@entry.save! 
  			                                                    else
  													                @entry = Volunteering::TimeEntry.find_by_week_and_record_id(entry["week"],entry["record_id"]) 
  													                @entry.update_attributes(:week => entry["week"], :days_attributes => entry["days_attributes"])
  														        end 
  														        
  														        session[:week] = entry["week"]
  														        
  														 }
   	    redirect_to summary_volunteering_time_entries_url(:id => session[:position])

    end
    
    def summary
    	
    	@position = Volunteering::Position.find(params[:id])
    	@records = Volunteering::Record.where('action = ? and position_id = ?','Accepted',params[:id])

        @entries = Volunteering::TimeEntry.where('week =? ', session[:week])
    	
    end
    
    def all_timesheets 
           
      @position = Volunteering::Position.find(params[:id])
      @records = Volunteering::Record.where('action = ? and position_id = ?','Accepted',params[:id])
      session[:position] = params[:id]
      
      @start = session[:week]	
      
      if @start.nil?
      	 unless @position.start.nil?
      	 start = Time.utc(@position.start.strftime('%Y-%m-%d %H:%M:%S'))
           
         @start = start - (start.wday-1)*24*60*60 - start.hour*60*60 - start.min*60 - start.sec
         
         @start = @start.strftime('%Y-%m-%d')
        end
      end
           
      
      @entries = Array.new
      	   
      @records.each do |r|
        	
        	@entry = Volunteering::TimeEntry.new 
        	@entry.record_id = r.id
              
            if Volunteering::TimeEntry.find_by_record_id(r.id).nil?      
       		    ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].each do |d|
       			   @entry.days.build
      		    end 
            else
       		
       		@entry = Volunteering::TimeEntry.find_by_record_id_and_week(r.id,session[:week])
   	        
   	        end
       	
            @entries << @entry

      end  
           
    end
  
  
    
       
  end