class SessionsController < Omega::Controller
  respond_to :html, :xml, :json, :js

  def index
    require_permission Session::PERMISSION_SESSIONS_VIEW
    respond_with(@sessions = Session.all)
  end

  def show
    require_permission Session::PERMISSION_SESSIONS_VIEW
    respond_with(@session = Session.find_by_id(params[:id]))
  end

  def new
    respond_with(@session = Session.new)
  end

  def edit
    require_permission Session::PERMISSION_SESSIONS_EDIT
  end

  def create
    @session = Session.new(params[:session])
    if @session.authenticate
      flash['Logged in']
      set_current_user(@session.user)
    end
    
    respond_with(@session, :location => session[:requested_page] || root_url)
  end

  def update
    
  end

  def destroy
    if params[:id]
      require_permission Session::PERMISSION_SESSIONS_DESTROY
      @session = Session.find(params[:id])
    else
      @session = nil #current session?
    end
    clear_current_user
    
    respond_with(:location => root_url)
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