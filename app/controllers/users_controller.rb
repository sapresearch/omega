class UsersController < Controller
  respond_to :html, :xml, :js, :json
  ##crud_helper User
  #require_permission User::PERM_VIEW, :except => [:register, :join,   :create, :lost_username, :lost_password]
  #require_permission User::PERM_ADMIN, :only  => [:new, :create, :update, :destroy]
  ##breadcrumb 'Users' => :users
  before_filter :sort, :only => [:index]
  def index
    @users = @users.paginate(:page => params[:page], :per_page => User::MAX_USERS_PER_PAGE)
    respond_with(@users)
  end

  def show
    @user = User.find(params[:id])
    respond_with(@user)
  end

  def new
    respond_with(@user)
  end

  def register
    @user = User.new
    contact = @user.build_contact
    contact.addresses.build
    contact.phone_numbers.build
    respond_with(@user)
  end

  def role_assignment
    @user = User.find(params[:id])
  end

  def join
    account = Account.find_by_name(params[:account_name])
    password = params[:user].delete(:password)
    confirm = params[:user].delete(:password_confirmation)

    # TODO if the user puts in the wrong format this fails. Make it fail gracefully.
    #params[:user][:contact_attributes].delete(:birthday)
    unless params[:user][:contact_attributes][:birthday].empty?
      params[:user][:contact_attributes][:birthday] = Date.strptime(params[:user][:contact_attributes][:birthday], '%m/%d/%Y')
    end

    @user = User.new(params[:user])
    @user.account = account
    @user.password = password
    @user.password_confirmation = confirm
    @user.save
    respond_with(@user)
  end

  def edit
    @user = User.find(params[:id])
    unless @user == current_user
      require_permission User::PERM_ADMIN
    end
    respond_with(@user)
  end

  def create
    @user = User.new(params[:user])
    respond_with(@user)
  end

  def update
    @user = User.find(params[:id])
    role_ids = params[:user].delete(:role_ids)

    if current_user.has_permission?(Role::PERM_ADMIN) and !role_ids.nil?
      roles = role_ids.inject([]) { |roles, id| roles << Role.find(id) }
    @user.roles = roles
    end
    @user.update_attributes(params[:user])
    Contact.for(@user).update_contact_attributes(params[:user][:contact_attributes])
    render "summary"
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    respond_with(@user)
  end

  def letter
    @letter = params[:letter]
    @users  = User.where('username like ?', "#{@letter}%").order('username')
    @users  = @users.paginate(:page => params[:page], :per_page => User::MAX_USERS_PER_PAGE)
    respond_with(@users) do |format|
      format.any(:html, :js) { render 'index' }
    end
  end

  def autocomplete
    @q     = params[:term]
    @users = User.named(@q)
    @users.limit(params[:limit]) if params[:limit]

    respond_with(@users) do |format|
      format.json do
        render :json  =>   @users.map { |c| {:id => c.id, :label => "#{c.last_name}  #{c.first_name}", :value => c.id} }
      end
    end
  end

  def lost_username
		if params[:email]
			@email = params[:email]
			@user = User.find_by_email(@email)
			UserMailer.lost_username(@email, @user).deliver
		end
		respond_with(:ok)
  end

  def lost_password
    if params[:username]
      @username = params[:username]
      @user = User.find_by_username(@username)
      @user_token = UserToken.create(:token_type => 'login', :user => @user)
      UserMailer.lost_password(@username, @user, @user_token, token_sessions_url(:token => @user_token.token), request.host).deliver
    end
    respond_with(:ok)
  end

  SORT_KEYS = ['username']
  SORT_DIRECTIONS = ['asc', 'desc']

  def sort
    @users = User.scoped
    params.each do |attr, direction|
      next unless SORT_KEYS.include?(attr) and SORT_DIRECTIONS.include?(direction)
      @users = @users.order("#{attr} #{direction}")
    end
  end

  def search
    @skills = Contact::Skill.all
    @interests = Contact::Interest.all
  end

  def my_page
    @user = User.find(params[:id])
    @contact = Contact.for(@user)
    @new_skill = Contact::Skill.new
    @new_interest = Contact::Interest.new
    if !@contact.nil?
      @other_skills = Contact::Skill.find(:all).reject do |s|
					@contact.skills.inject(false) { |result, contacts_skills| result = result == true ? result : s.name == contacts_skills.name }
				end
      @other_interests = Contact::Interest.find(:all).reject do |s|
					@contact.interests.inject(false) { |result, contacts_interests| result = result == true ? result : s.name == contacts_interests.name }
				end
    end

    if !@user.is_admin?
      registered_services = ServiceRegistration.filter_services_by_registrant(Service.all, @contact)
      if not registered_services.empty?
        @service_events = Array.new
        registered_services.each do |service|
          registrations = service.service_registrations.select { |sr| sr.registrant == @contact }
          if !registrations.at(0).nil?
            status = registrations.at(0).status
            next_event = service.next_event.nil? ? "TBD" : service.next_event.start_at.to_s.gsub(/:00 .*/, "")
            @service_events << { :service => service, :next_event => next_event, :status => status }
          end
        end
      end

      volunteering_records = Volunteering::Record.where(:contact_id => Contact.for(@user))
      @positions = volunteering_records.inject(Array.new) do |positions, record|
					position = Volunteering::Position.find(record.position_id)
					positions.push({ :position => position, :record => record.action })#@positions has hashes with the position and record as key-value pairs for each position the user is signed up
				end
    elsif @user.is_admin?
      @service_events = Service.find(:all).inject(Array.new) do |service_events, service|
					service_events_hash = {:service => service, :status => "Administrator"}
					service_events_hash[:next_event] = service.next_event.nil? ? "TBD" : service.next_event.start_at.to_s.gsub(/:00 .*/, "")
					service_events << service_events_hash
				end
      @positions = Volunteering::Position.find(:all).inject(Array.new) do |positions, p|
					positions.push({ :position => p, :record => 'Administrator' }) #@positions has hashes with the position and record as key-value pairs for each position the user is signed up
				end
    end

    @sap_profile_id = 100002599482156
    @sap_profile_id_2 = 253183958028424
    @sap_profile_id_secret_2 = "7b4684019a0ea345ce8976f8d3a7d57a"

    @settings = Setting.new
  end

  def update_my_page
		@user = User.find(params[:id])
    contact = @user.contact
		contact.update_skills_and_interests(params)
    params[:contact].delete(:skill_ids); params[:contact].delete(:interest_ids)
    contact.update_contact_attributes(params[:contact])
		contact.update_attributes(last_name: params[:contact][:last_name], first_name: params[:contact][:first_name], email: params[:contact][:email])
		@user.update_attributes(last_name: params[:contact][:last_name], first_name: params[:contact][:first_name], email: params[:contact][:email])
    redirect_to(my_page_user_path(@user))
  end

  def check_email_uniqueness
    has_same_email = User.find_by_email(params[:user][:contact_attributes][:email]).nil?

    respond_to do |format|
      format.json { render :json => has_same_email }
    end
  end

  def check_username_uniqueness
    has_same_username = User.find_by_username(params[:user][:username]).nil?

    respond_to do |format|
      format.json { render :json => has_same_username }
    end
  end
  
  # def myomega_page_info_entered
    # @user = current_user
    # if @user.first_name
  # end

end
