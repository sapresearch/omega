class UsersController < ApplicationController
  respond_to :html, :xml, :js, :json
  crud_helper User, :new => [:register]
  require_permission User::PERM_VIEW,  :except => [:register]
  require_permission User::PERM_ADMIN, :only   => [:new, :edit, :update, :destroy]

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
    params['registration'] = true
    respond_with(@user)
  end

  def edit
    respond_with(@user)
  end

  def create
    case params['registration'] ? :register : :create
      when :register
        @user = User.register(params[:user])
      when :create
        require_permission User::PERM_ADMIN
        @user = User.create(params[:user])
    end

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
end