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
      #@entry.record = Volunteering::Record.find(params[:id]) # commented out so i can test w/ 
      ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].each do |day|
        @entry.days.build(:day => day)
      end
		@entries = Volunteering::TimeEntry.find_by_contact(Contact.for(current_user).id)
		@record = params[:id]

		# AJAX call.
		if not params[:contact_id].nil? 
			puts "\n\nin not nil loop"
			selected_user = Contact.find(params[:contact_id]).user
			puts "\n\n selected contact: " + selected_user.inspect.to_s
			@records = Volunteering::Record.for(selected_user)
			puts "\n\n Records: " + @records.inspect.to_s
		elsif params[:contact_id].nil? 
			puts "\n\nin the nil loop"
			@records = Volunteering::Record.for(current_user)
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
	#       	if Volunteering::TimeEntry.find_by_record_id(r.id).nil?      
       		['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].each do |d|
       			@entry.days.build
          	end 
    	   	@entries << @entry
     		end
       end
    end

    def create
		record_id = params[:volunteering_time_entry][:record_id]
		contact_id = params[:contact][:id]

		if params.has_key?(:volunteering_time_entry)
      	@entry = Volunteering::TimeEntry.create(params[:volunteering_time_entry])
			monday_of_the_week = @entry.week - (@entry.week.cwday - 1) # Find the Monday for the week that the user selected.
			@entry.update_attributes(:week => monday_of_the_week)
		elsif !params.has_key?(:volunteering_time_entry)
      	@entry = Volunteering::TimeEntry.create(params)
		end
# THIS IS ANNE'S LATENT CODE. I HAVEN'T DELETED IT YET, IN THE OFF-CHANCE IT'S ACTUALLY USEFUL FOR SOMETHING.
#  		@timesheets = params[:entries].values.collect do |entry| 
#			if Volunteering::TimeEntry.find_by_week_and_record_id(entry["week"],entry["record_id"]).nil?
#				@entry = Volunteering::TimeEntry.new(entry) 
#				@entry.save! 
#			else
#				@entry = Volunteering::TimeEntry.find_by_week_and_record_id(entry["week"],entry["record_id"]) 
#				@entry.update_attributes(:week => entry["week"], :days_attributes => entry["days_attributes"])
#			end 
#			session[:week] = entry["week"]
#		end
		#redirect_to summary_volunteering_time_entries_url(:id => position_id)
		redirect_to new_volunteering_time_entry_url(:id => params[:volunteering_time_entry][:record_id])
    end
    
    def summary
    	@position = Volunteering::Position.find(params[:id])
    	@records = Volunteering::Record.where('action = ? and position_id = ?', 'Accepted', params[:id])
		# I canged this to show all timesheets.
      #@entries = Volunteering::TimeEntry.where('week = ?', session[:week])
      @entries = Volunteering::TimeEntry.all
    end
    
    def all_timesheets 
      @position = Volunteering::Position.find(params[:id])
      @records = Volunteering::Record.where('action = ? and position_id = ?', 'Accepted', params[:id])
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
	  # I think that this should only have one iteration, since there should only be one record per position.
     @records.each do |r|
        @entry = Volunteering::TimeEntry.new 
        @entry.record_id = r.id
        if Volunteering::TimeEntry.find_by_record_id(r.id).nil?      
           ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].each { |d| @entry.days.build }
        else
		  	  @entry = Volunteering::TimeEntry.find_by_record_id_and_week(r.id,session[:week])
   	  end
        @entries << @entry
     end  
  end
       
end
