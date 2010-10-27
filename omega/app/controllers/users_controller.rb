class UsersController < Omega::Controller
  respond_to :html, :xml, :js, :json
  crud_helper User
  require_permission User::PERM_VIEW, :except => [:register, :create]
  require_permission User::PERM_ADMIN, :only  => [:new, :edit, :create, :update, :destroy]

  def index
    respond_with(@users)
  end

  def show
    respond_with(@user)
  end

  def new
    respond_with(@user)
  end

  def register
    if request.post?
      @user = User.register(params[:user])
    else
      @user = User.new
    end

    respond_with(@user)
  end

  def edit
    respond_with(@user)
  end

  def create
    @user = User.create(params[:user])

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

  def autocomplete
    @q = params[:term]
    @users = User.named(@q)
    @users.limit(params[:limit]) if params[:limit]

    respond_with(@users) do |format|
      format.json do
        render :json  =>   @users.map { |c| {:id => c.id, :label => "#{c.last_name}  #{c.first_name}", :value => c.id} }
      end
    end
  end

end