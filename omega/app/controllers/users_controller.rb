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
    respond_with(@user)
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

end