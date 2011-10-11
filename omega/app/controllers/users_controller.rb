class UsersController < Omega::Controller
  respond_to :html, :xml, :js, :json
  crud_helper User
  #require_permission User::PERM_VIEW, :except => [:register, :join,   :create, :lost_username, :lost_password]
  #require_permission User::PERM_ADMIN, :only  => [:new, :create, :update, :destroy]
  breadcrumb 'Users' => :users
  before_filter :sort, :only => [:index]

  def index
    @users = @users.paginate(:page => params[:page], :per_page => User::MAX_USERS_PER_PAGE)
    respond_with(@users)
  end

  def show
    
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
    @user = User.register(params[:user])
    respond_with(@user)
  end

  def edit
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
    @user.update_attributes(params[:user])
    
    render "summary"
  end

  def destroy
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
      @users = User.where('email = ?', @email)

      UserMailer.lost_username(@email, @users).deliver
    end

    respond_with(:ok)
  end

  def lost_password
    if params[:username]
     
      @username = params[:username]
      @user = User.find_by_username(@username)

      @user_token = UserToken.create(:token_type => 'login', :user => @user)

      UserMailer.lost_password(@username, @user, @user_token, token_sessions_url(:token => @user_token.token)).deliver
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
		#Contact::Skill.all.each do |s|
			#if s.contact.respond_to? 'user' then
				#hash{word => s.contact.user}
			#end
		#end

		#@word_user_hash = Contact.
	end


	def my_page
		@contact = Contact.for(current_user)
		@new_skill = Contact::Skill.new
		@new_interest = Contact::Interest.new
		@other_skills = Contact::Skill.find(:all).reject do |s|
			@contact.skills.inject(false) { |result, contacts_skills| result = result == true ? result : s.name == contacts_skills.name } 
		end
		@other_interests = Contact::Interest.find(:all).reject do |s|
			@contact.interests.inject(false) { |result, contacts_interests| result = result == true ? result : s.name == contacts_interests.name } 
		end

		if !current_user.is_admin?
			volunteering_records = Volunteering::Record.where(:contact_id => Contact.for(current_user))
 			@positions = volunteering_records.inject(Array.new) do |positions, record|
				position = Volunteering::Position.find(record.position_id)
				positions.push({ :position => position, :record => record.action }) # @positions has hashes with the position and record as key-value pairs for each position the user is signed up for.
			end
		elsif current_user.is_admin?
 			@positions = Volunteering::Position.find(:all).inject(Array.new) do |positions, p|
				positions.push({ :position => p, :record => 'Administrator' }) # @positions has hashes with the position and record as key-value pairs for each position the user is signed up for.
			end
		end
			

		@sap_profile_id = 100002599482156
		@sap_profile_id_2 = 253183958028424 
		@sap_profile_id_secret_2 = "7b4684019a0ea345ce8976f8d3a7d57a"

		@settings = Setting.new
		respond_with(@other_skills, @other_interests)
	end

	def update_my_page
		contact = Contact.for(current_user)

		skills = params[:contact][:skill_ids].gsub(/[\[\]]/, "").split(',').uniq # Use gsub and split to format the ids as an array, rather than a string.
		contact.update_attributes(:skill_ids => skills)
		contact.skills << Contact::Skill.create(params[:contact_skill]) unless params[:contact_skill][:name].blank?

		interests = params[:contact][:interest_ids].gsub(/[\[\]]/, "").split(',').uniq
		contact.update_attributes(:interest_ids => interests)
		contact.interests << Contact::Interest.create(params[:contact_interest]) unless params[:contact_interest][:name].blank?

		redirect_to(my_page_users_path)
	end

end
