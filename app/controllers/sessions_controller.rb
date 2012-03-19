	class SessionsController < Controller
	  respond_to :html, :xml, :json, :js
	
	  def index
	    require_permission Session::PERM_ADMIN
	    respond_with('tenant', @sessions = Session.all)
	  end
	
	  def show
	    require_permission Session::PERM_ADMIN
	    respond_with('tenant', @session = Session.find_by_id(params[:id]))
	  end
	
	  def new
	    respond_with('tenant', @session = Session.new)
	  end
	
	  def edit
	    require_permission Session::PERM_ADMIN
	  end
	
	  def create
	    @session = Session.new(params[:session])
	    @session.requested_page = session[:requested_page] || root_url
	
	    if @session.authenticate
	      flash['Logged in']
	      set_current_user(@session.user)
	    end
	    
	    respond_with('tenant', @session)
	  end
	
	  def update
	    
	  end
	
	  def token
	    @user_token = UserToken.find_by_token!(params[:token])
	
	    raise('Token has been used') if @user_token.consumed_at
	
	    set_current_user(@user_token.user)
	    @user_token.touch(:consumed_at)
	
	    redirect_to edit_user_url(@user_token.user)
	  end
	
	  def destroy
	    if params[:id]
	      require_permission Session::PERM_ADMIN
	      @session = Session.find(params[:id])
	    else
	      @session = nil #current session?
	    end
	    clear_current_user
	    
	    redirect_to root_url
	  end
	
	  private
	    def clear_current_user
	      @current_user = nil
	      reset_session
	    end
	
	    def set_current_user(user)
	      session[:user_id] = user.id
	      @current_user = user
	    end
	end
