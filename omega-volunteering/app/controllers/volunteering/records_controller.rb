require 'filter.rb'
class Volunteering::RecordsController < Omega::Controller
  respond_to :html, :xml, :json, :js
  require 'zipcodr'
  require 'faster_haversine'
  require 'gmapper'
  require 'kamel'
  breadcrumb 'Volunteering' => :volunteering
  breadcrumb 'Volunteering Applications' => :volunteering_records


  def index
    @records = Volunteering::Record.scoped.includes(:contact, :position)
    @records = @records
    @records = @records.paginate(:page => params[:page], :per_page => Volunteering::Record::MAX_RECORDS_PER_PAGE)
    respond_with(@records)
  end

  def show
    @record = Volunteering::Record.find(params[:id])
    respond_with(@record)
  end

  def newest
    @records = Volunteering::Record.find(:all, :conditions => ['status = ?', "Applied"])
    @records =  @records.paginate(:page => params[:page], :per_page => Volunteering::Record::MAX_RECORDS_PER_PAGE)
    breadcrumb 'Newest Applications' => :newest_volunteering_records
    respond_with(@records)

  end

  def pending
    @records = Volunteering::Record.find(:all, :conditions => ['status = ?', "Pending"])
    breadcrumb 'Pending Applications' => :pending_volunteering_records
    respond_with(@records)
  end

  def my_applications
    @records = Volunteering::Record.where('volunteering_records.contact_id = ?', Contact.for(current_user))
    @records = @records.paginate(:page => params[:page], :per_page => Volunteering::Record::MAX_RECORDS_PER_PAGE)
    breadcrumb 'Pending Applications' => :pending_volunteering_records
    respond_with(@records)
  end

  def completed
    @records = Volunteering::Record.find(:all, :conditions => ['status = ?', "Complete"])
    @records = @records.paginate(:page => params[:page], :per_page => Volunteering::Record::MAX_RECORDS_PER_PAGE)
    breadcrumb 'Completed Applications' => :completed_volunteering_records
    respond_with(@records)

  end

  def administer
    @record = Volunteering::Record.find(params[:id])
    respond_with(@record)
  end


  def admin_page

  end

  #this method is meant to show a history of applications. therefore we need to create new records on update instedad of updating them
  def history
    record    = Volunteering::Record.find(params[:id])
    @records  = Volunteering::Record.where('position_id = ?', record.position_id).order('created_at desc')
    @records =  @records.paginate(:page => params[:page], :per_page => Volunteering::Record::MAX_RECORDS_PER_PAGE)
    respond_with(@records)
  end

  def user_history
    contact_id    = Volunteering::Record.find(params[:contact_id])
    @contact      = Contact.find(contact_id)
    @records      = Volunteering::Record.where('contact_id = ?', contact_id).order('created_at desc')
  
    breadcrumb 'Applications from user' => 'Applications from user'
    respond_with(@records)
  end

  def new
    @record = Volunteering::Record.new
    @record.position = Volunteering::Position.find(params[:id])

	 @record.build_contact do |c|
      c.addresses.build
      c.phone_numbers.build
    end 
    
    @contact = Contact.for(current_user)
    
    respond_with(@record)
  end

  def new_volunteer
    @record = Volunteering::Record.new
    @record.position = Volunteering::Position.find(params[:id])

		@record.build_contact do |c|
      c.addresses.build
      c.phone_numbers.build
    end 
  end

  def edit
    @record = Volunteering::Record.find(params[:id])
    @record.build_contact do |c|
      c.addresses.build
      c.phone_numbers.build
    end 
    
    @contact = Contact.find(@record.contact_id)
    
    respond_with(@record)
  end

  def create
   contact = params[:volunteering_record][:contact]
	puts "Volunteering::RecordsController. Contact hash: " + contact.inspect.to_s
   params[:volunteering_record].delete(:contact) 
   @record = Volunteering::Record.create(params[:volunteering_record])
   @record.action = 'To Be Taken'

   if @record.contact_id.nil? 
   	@contact = Contact.create(contact)
   	@record.contact_id = @contact.id
   	@record.action = "accepted"
   else
   	@contact = Contact.find(@record.contact_id)	   
   	@contact.update_contact_attributes(contact)
   end
   
   @record.save
   
   unless @record.contact_id.nil?
   @user = Contact.find(@record.contact_id)
   UserMailer.parental_approval(@user).deliver
   end
   respond_with(@record)
  end
  
  def create_volunteer
   
   @record = Volunteering::Record.create(params[:volunteering_record])
   @record.action = 'Accepted'
   @record.save
    
   
   @user = Contact.find(@record.contact_id)
   
   UserMailer.parental_approval(@user).deliver
  
   respond_with(@record)
    
  end
  
  def update
    @record = Volunteering::Record.find(params[:id])

    if @record.contact.user
      case params[:volunteering_record][:action]
        when 'More Information'
          params[:volunteering_record][:status] = 'Pending'
          status                                = 'Further information for your application is required'
          msg                                   = 'a'
        when 'Reject'
          params[:volunteering_record][:status] = 'Complete'
          status                                = 'Your applicaton got rejected'
          msg                                   = 'a'
        when 'Accept'
          params[:volunteering_record][:status] = 'Complete'
          status                                = 'Your applicaton got accepted'
          msg                                   = 'a'
      end
      
      if params[:volunteering_record][:more_information]
        msg = params[:volunteering_record][:more_information]
      end

      @message         = Message.new()
      @message.subject = status
      @message.body    = msg
      @message.to      = @record.contact.user
      @message.from    = current_user
      @message.save
    end

	contact = params[:volunteering_record][:contact]
    params[:volunteering_record].delete(:contact) 
    
    @record.update_attributes(params[:volunteering_record])
    
    @contact = Contact.find(@record.contact_id)

	@contact.update_attributes(contact)

    respond_with(@record)
  end

  def withdraw
    @record = Volunteering::Record.find(params[:id])
    @record.update_attributes(:status => 'withdrawn')

    redirect_to my_applications_volunteering_records_url
  end

  def destroy
    @record = Volunteering::Record.find(params[:id])
    @record.destroy
  end

	def enroll_volunteers
		#@all_filters = SearchFilter.filter_for(Contact, Hash.new, [ {:class => :skills, :column => :name, :type => :string}, { :class => :interests, :column => :name, :type => :string } ] )

		options = [ {:class => :skills, :column => :name, :type => :string}, { :class => :interests, :column => :name, :type => :string } ]
		Contact::Field.all.each do |cf|
			column = cf.name.nil? ? "" : cf.name.to_sym
			type = cf.data_type.nil? ? "" : cf.data_type.to_sym
			options << { :class => :self, :column => column, :type => type }
		end
		@all_filters = SearchFilter.filter_for(Contact, Hash.new, options) # Use a blank hash so it doesn't filter anything. Use this for the checkbox filters.
		@filter = SearchFilter.filter_for(Contact, params, options) # Use this one to display all the contacts.
		puts "\n\n These are the params " + params.inspect.to_s
		puts "\n\n This is filter: " + @filter.inspect.to_s

		@position = Volunteering::Position.find(params[:id])
		@position_id = @position.id
		@records = Array.new
		@contacts = Contact.find(:all)
		@contacts.each do |c|
    		record = Volunteering::Record.new
			record.position_id = @position_id
			record.contact_id = c.id
			@records.push(record)
		end
		@records << Volunteering::Record.new if @records.empty?

		@zips = []
		@zips << Zipcodr::find('08648').zip
		@zips << Zipcodr::find('08648').city
		@zips << Zipcodr::find('08648').state
		@zips << Zipcodr::find('08648').county

		@zip1 = []
		@zip1 << Zipcodr::find('02138').lat
		@zip1 << Zipcodr::find('02138').long

		@zip2 = []
		@zip2 << Zipcodr::find('02139').lat
		@zip2 << Zipcodr::find('02139').long

		@distance = FasterHaversine.distance(@zip1[1], @zip1[0], @zip2[1], @zip2[0])
		@map = Google::Maps::Static::Map.new :center => [@zip1[0], @zip1[1]]
		@map << Google::Maps::Static::Markers.new([@zip1[0], @zip1[1]], :color => :blue, :label => 'Admin')
		@map << Google::Maps::Static::Markers.new([@zip2[0], @zip2[1]], :color => :green, :label => 'User')

		respond_with(@skills_and_interests)
	end

	def create_multiple
		position_id = params[:records][:position_id]
		contact_ids = params[:records][:contact_ids]
		contact_ids.gsub!(/\[|\]/, "")
		contact_ids = contact_ids.split(",")
		contact_ids.each do |contact_id|
			v = Volunteering::Record.new(:position_id => position_id,
												  :contact_id => contact_id,
												  :status => "Accepted"
												 )
			if v.save
				p = Volunteering::Position.find(position_id)
				boolean = p.contacts.select! { |c| c.id == contact_id}
			elsif !v.save
    			redirect_to my_applications_volunteering_records_url
			end
		end
		redirect_to volunteering_positions_url
	end

	def zip_search
		@zip1 = []
		@zip1 << Zipcodr::find('08648').lat
		@zip1 << Zipcodr::find('08648').long

		@zip2 = []
		@zip2 << Zipcodr::find('26506').lat
		@zip2 << Zipcodr::find('26506').long

		@map = Google::Maps::Static::Map.new :center => [@zip1[0], @zip1[1]]
		Contact::Address.all.each do |a|
			zip = a.zip_code
			lat = Zipcodr::find(zip).lat
			long = Zipcodr::find(zip).long
			@map << Google::Maps::Static::Markers.new([lat, long], :color => :blue)
		end

		# For prototyping only.
		@map << Google::Maps::Static::Markers.new([@zip1[0], @zip1[1]], :color => :blue, :label => 'Admin')
		@map << Google::Maps::Static::Markers.new([@zip2[0], @zip2[1]], :color => :green, :label => 'User')

		@zips = ['08648', '26506', '68521', '02139' ]
		
		@users = User.all_users_with_zip
	end

end
