class ContactsController < Omega::Controller
  respond_to :html, :xml, :js, :json
  sub_layout :determine_sub_layout
  crud_helper Contact, :all => [:all, :list]

  contact_is_self = lambda { @contact.user == current_user }
#  require_permission Contact::PERM_VIEW, :except => [:show, :edit]
#  require_permission Contact::PERM_VIEW, :only => [:show, :edit], :unless => contact_is_self
#  require_permission Contact::PERM_VIEW_SELF, :only => [:show, :edit], :if     => contact_is_self
#  require_permission Contact::PERM_ADMIN, :only => [:new, :create, :destroy]
#  require_permission Contact::PERM_ADMIN, :only => [:edit, :update], :unless => contact_is_self
#  require_permission Contact::PERM_EDIT_SELF, :only => [:edit, :update], :if     => contact_is_self

  before_filter :get_contact_volunteering_records, :only => [:show, :edit, :update]

  breadcrumb 'Contacts' => :contacts

  def index
    @contact_groups = Contact::Group.all.group_by(&:group_type)
    respond_with(@contacts) do |format|
      format.any(:html, :js) { render 'all' }
    end
  end

  def all
    @contacts = Contact.status
    respond_with(@contacts)
  end

  def list
    respond_with(@contacts)
  end

  def show
    @contact_groups = Contact::Group.all.group_by(&:group_type)
    respond_with(@contact)
  end

  def new
    @contact.addresses.build
    @contact.phone_numbers.build
    respond_with(@contact)
  end

  def edit
    respond_with(@contact)
  end

  def upload
    @contact = Contact.find(params[:id])
    respond_with(@contact)
  end

  def do_upload
    @contact = Contact.find(params[:id])
    @contact.update_attributes(params[:contact])
    respond_with(@contact)
  end

  def create
    respond_with(@contact = Contact.create(params[:contact]))
  end

  def autocomplete
    @q        = params[:term]
    @contacts = Contact.named(@q)
    @contacts.limit(params[:limit]) if params[:limit]

    respond_with(@contacts) do |format|
      #format.psv { render :text => @contacts.map { |c| "#{c.last_name} #{c.first_name}|#{c.id}" }.join("\n") }
      format.json do
        if @contacts.any?
          render :json  =>   @contacts.map { |c| {:id => c.id, :label => "#{c.last_name}  #{c.first_name}", :value => c.id} }
        else
          render :json =>  [{:label => "No records founds", :value => "sds"}]
        end
      end
    end
  end

  def search
    @q        = params[:q]
    @contacts = Contact.named(@q)

    respond_with(@contacts) do |format|
      format.any(:html, :js) { render 'all' }
    end
  end

  def letter
    @letter   = params[:letter]
    @contacts = Contact.where('last_name like ?', "#{@letter}%").order('last_name')

    respond_with(@contacts) do |format|
      format.any(:html, :js) { render 'all' }
    end
  end

  def update
    if uploads = params[:uploads]
      uploads.each { |upload| @contact.uploads << Upload.find(upload) }
    end

    @contact.update_attributes(params[:contact])
    respond_with(@contact)
  end

  def destroy
    @contact.destroy
    respond_with(@contact)
  end


  private
    def get_contact_volunteering_records
      @records = Volunteering::Record.where('contact_id = ?', params[:id]).order('created_at desc').limit(5)
    end

    def determine_sub_layout
      case params[:action]
        when 'index'
          'contacts/with_groups'
        else
          nil
      end
    end
end
