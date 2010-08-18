class SessionsController < ApplicationController
  respond_to :html, :xml, :json, :js

  def index
    respond_with(@sessions = Session.all)
  end

  def show
    respond_with(@session = Session.find_by_id(params[:id]))
  end

  def new
    respond_with(@session = Session.new)
  end

  def edit
  end

  def create
    @session = Session.new(params[:session])
    @session.requested_page = url_for(session[:requested_page]) if session[:requested_page]
    options = {}

    if @session.authenticate
      flash['Logged in']
      set_current_user(@session.user)
      options[location] = @session.requested_page || root_url

      # clear out requested page so it doesn't come back after the user has logged out
      session[:requested_page] = nil
    end
    
    respond_with(@session, options)
  end

  def update
    
  end

  def destroy
    if params[:id]
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
      session[:user_id] = nil
    end

    def set_current_user(user)
      session[:user_id] = user.id
      @current_user = user
    end
end