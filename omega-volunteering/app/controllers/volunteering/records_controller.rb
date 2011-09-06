class Volunteering::RecordsController < Omega::Controller
  respond_to :html, :xml, :json, :js
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
   params[:volunteering_record].delete(:contact) 
   @record = Volunteering::Record.create(params[:volunteering_record])
   @record.action = 'To Be Taken'

   if @record.contact_id.nil? 
   	@contact = Contact.create(contact)
   	@record.contact_id = @contact.id
   	@record.action = "accepted"
   else
   	@contact = Contact.find(@record.contact_id)	   
    @contact.update_attributes(contact)
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
		@skills = Contact::Skill.all
		@interests = Contact::Interest.all
		@contacts = Contact.all
		@position_id = Volunteering::Position.find(params[:id]).id
		@records = Array.new
		@contacts.each do |c|
    	record = Volunteering::Record.new
			record.position_id = @position_id # Volunteering::Position.find(params[:id])
			record.contact_id = c.id
			@records.push(record)
		end

		@records_to_search = Array.new
		@contacts.each do |c|
			@records_to_search.push(c.first_name) 
			@records_to_search.push(c.last_name)
		end
		@interests.each { |i| @records_to_search.push(i.name) }
		@skills.each { |s| @records_to_search.push(s.name) }

		@contact_term_hash = Hash.new
		Contact.all.each do |c| 
			contact_hash = Hash.new
			@contact_term_hash[c.id] = contact_hash
			contact_hash[:first_name] = c.first_name
			contact_hash[:last_name] = c.last_name
			contact_hash[:id] = c.id
			skills = String.new
			c.skills.each { |s| skills << "#{s.name}," }
			contact_hash[:skills] = skills
			interests = String.new
			c.interests.each { |i| interests << "#{i.name}," }
			contact_hash[:interests] = interests
		end
		def @contact_term_hash.get_all(*keys)
			return_array = Array.new
			keys.each do |key|
				self.each do |contact_id, contact|
					contact[key].split(",").each { |v| return_array.push(v) }
				end
			end
			return_array.uniq
		end
	end

	def create_multiple


		params[:records].each do |record_key, attributes|
			position_id = params[:records][record_key][:position_id]
			puts "\n\n" + position_id + "\n\n"
			if (attributes[:status] == "accepted") then
			puts "\n\n" + params[:records][record_key].inspect + "\n\n"
				@record = Volunteering::Record.new(params[:records][record_key])
				#@record = Volunteering::Record.create(params[:records][record_key])
			end
		end

		#@records = params[:records]
		#@correct_records = params[:records].reject { |k,v| v[:status] != "accepted"}
			#puts "\n\n" + @correct_records.inspect + "\n\n"
		#@correct_records.each do |k,v|
			#puts "\n\n" + params[:records][k].inspect + "\n\n"
			#Volunteering::Record.create[@correct_records]
		#end


		#i = 0
		#params[:records].each do |k, v|
		#	if (k.to_s == 2) then
		#		params[:records[k]]) #.reject { |key, value| key == :status and value != "accepted" }
		#		Volunteering::Record.create(params[:records[k]]) #.reject { |key, value| key == :status and value != "accepted" }
		#	end
		#	i += 1
		#end
    redirect_to my_applications_volunteering_records_url
	end

end
