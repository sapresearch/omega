	class Volunteering::PositionsController < Controller
	  respond_to :html, :xml, :json, :js
	  require 'zipcodr'
	
	  require_permission Volunteering::PERM_VIEW
	  require_permission Volunteering::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]
	
	  before_filter :get_positions, :only => [:index, :upcoming, :skills, :interests]
	  before_filter :get_my_positions, :only => [:mine]
	  before_filter :get_skills, :only => [:index, :upcoming, :skills, :mine]
	  before_filter :get_interests, :only => [:index, :upcoming, :interests, :mine]
	  before_filter :sort, :only => [:index]
	
	  breadcrumb 'Volunteering' => :volunteering
	  breadcrumb 'Positions' => :volunteering_positions
	
	
	  def index
	    @positions = @positions.paginate(:page => params[:page], :per_page => Volunteering::Position::MAX_POSITIONS_PER_PAGE)
      #fetch skills and interests of contacts and return array of unique elements with the number of occurrences
      #this is used in the tag cloud feature
      skills = Contact::Skill.all.map { |r| r.name.to_s.downcase }
      interests = Contact::Interest.all.map { |r| r.name.to_s.downcase }
      @tags = (skills + interests).inject({}) { |r, e| r[e] = r[e].nil? ? 1 : r[e]+1; r }.flatten(0)
	    respond_with(@positions, @tags)
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
		 @contact_assignment = @position.contacts.count > 0 ? 'existing' : 'none'
	    respond_with(@position)
	  end
	
	  def new
	    @position = Volunteering::Position.new
	    fix_model_to_view
		 @contact_assignment = 'new'
	    respond_with(@position)
	  end
	
	  def create
		 @contact_assignment = params[:contact_assignment] # Do this in case the validation fails and @position is reloaded.
		 fix_view_to_model
		 #field_positions = params[:volunteering_position].delete(:contact_field_volunteering_position_id)
		 field_ids = params[:volunteering_position].delete(:contact_fields)
		 @position = Volunteering::Position.new(params[:volunteering_position])
		
	 	 #@field.update_positions(field_positions)
	 	 fields = Array.new
		 field_ids.each { |key, id| fields << Contact::Field.find(id) } if !field_ids.nil?
		 @position.contact_fields = fields
		
		 if @position.save
			@position.update_attributes(:end => @position.correct_end_date) if !@position.recurrent
			# Do this after position so that it is assigned an ID.
			#field_positions = @position.id.to_s if field_positions.to_i == 0
		  	respond_with(@position)
		 else
			reset_view_if_error
		   respond_with(@position)
		 end
	  end
	
	  def update
	    fix_view_to_model
	    @position = Volunteering::Position.find(params[:id])
		 @contact_assignment = params[:contact_assignment] # Do this in case the validation fails and @position is reloaded.
	
		 field_ids = params[:volunteering_position].delete(:contact_fields)
		 fields = Array.new
		 if not field_ids.nil?
		 	field_ids.each { |key, id| fields << Contact::Field.find(id) }
		 end
		 @position.contact_fields = fields
	
	    @position.update_attributes(params[:volunteering_position])
	    fix_model_to_view
	    respond_with(@position)
	  end
	
	  def destroy
	    @position = Volunteering::Position.find(params[:id])
	    @position.destroy
	    respond_with(@position)
	  end
	
	  def skills
	    @positions = @positions.paginate(:page => params[:page], :per_page => Volunteering::Position::MAX_POSITIONS_PER_PAGE)
	      breadcrumb 'Skills' => 'skills'
	    render :index
	  end
	
	  def interests
	    @positions = @positions.paginate(:page => params[:page], :per_page => Volunteering::Position::MAX_POSITIONS_PER_PAGE)
	     breadcrumb 'Interests' => 'interests'
	    
	    render :index
	  end
	
	  def mine
	    @postions = Array.new
	    
	    @my_records = Volunteering::Record.where('contact_id = ? and action = ?', Contact.for(current_user), "Accepted")
	    @my_records.each do |r|
	    	@positions << Volunteering::Position.find(r.position_id) 
	    end
	    
	    @positions = @positions.paginate(:page => params[:page], :per_page => Volunteering::Position::MAX_POSITIONS_PER_PAGE)
	
	    breadcrumb 'My Positions' => :mine_volunteering_positions
	  end
	
	  def my_time_sheets
	    @entry_days = Volunteering::TimeEntry::Day.all
	    @timesheets = Array.new
	    @records = Volunteering::Record.find_all_by_contact_id(Contact.for(current_user))
	    @records.each do |r|
	      @timesheets << Volunteering::TimeEntry.find_all_by_record_id(r.id)
	    end
	    breadcrumb 'My Time Sheets' => :my_time_sheets_volunteering_positions
	  end
	
	  def history
	    @position = Volunteering::Position.find(params[:id])
	    @records = @position.records
	    @records = @records.paginate(:page => params[:page], :per_page => Volunteering::Record::MAX_RECORDS_PER_PAGE)
	    respond_with(@records)
	  end
	
	  private
	  
	  def get_positions
	    @positions = Volunteering::Position.includes(:skills, :records).order
	
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
	    @positions = Volunteering::Position.joins(:records).
	            where('volunteering_records.contact_id = ?', Contact.for(current_user)).
	            where('volunteering_records.action = ?', 'accept')
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
	      params[:volunteering_position][:contact_ids] = JSON.parse(contact_ids)
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
	          params[:volunteering_position][:schedule_attributes][:start_time] = '00:00'
	          params[:volunteering_position][:schedule_attributes][:end_time] = '00:00'
	      end
	    end
	  end
	
	  def fix_model_to_view
		 @positions = Volunteering::Position.find(:all).unshift(Volunteering::Position::CollectionWithAll.new, Volunteering::Position::CollectionWithCurrentPosition.new)
		 @new_field = Contact::Field.new
	
	    @position.build_event_source unless @position.event_source
	
	    @position.contacts.build do |c|
	      c.phone_numbers.build
	    end if @position.contacts.empty?
	
	    @position.build_schedule unless @position.schedule
	
	    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].each do |day|
	      @position.schedule.days.build(:day => day) unless @position.schedule.days.any? { |d| d.day == day }
	    end
	  end
	
	  def reset_view_if_error
		 @positions = Volunteering::Position.find(:all).unshift(Volunteering::Position::CollectionWithAll.new, Volunteering::Position::CollectionWithCurrentPosition.new)
	    @position.build_event_source unless @position.event_source
	  end	
	end
