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
    
    @contact = Contact.new
    
    respond_with(@record)
  end

  def edit
    @record = Volunteering::Record.find(params[:id])
    respond_with(@record)
  end

  def create
   
  # contact = params[:volunteering_record][:contact]
  # params[:volunteering_record].delete(:contact) 
  # @record = Volunteering::Record.create(params[:volunteering_record])
  # @record.action = 'To Be Taken'
  # @record.save
    
   #@contact = Contact.find(@record.contact_id)
   #@contact.update_attributes(contact)
   
    
 #  @user = Contact.find(@record.contact_id)
  # UserMailer.parental_approval(@user).deliver
  
   respond_with(@record)
    
  end
  
  def create_volunteer
   
   contact = params[:volunteering_record][:contact]
   params[:volunteering_record].delete(:contact) 
   @record = Volunteering::Record.create(params[:volunteering_record])
   @record.action = 'To Be Taken'
   @record.save
    
   @contact = Contact.find(@record.contact_id)
   @contact.update_attributes(contact)
   
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


    @record.update_attributes(params[:volunteering_record])
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


end
