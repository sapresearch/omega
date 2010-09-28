class UsersController < ApplicationController
  respond_to :html, :xml, :js, :json
  crud_helper User, :new => [:register]
  require_permission User::PERM_VIEW,  :except => [:register, :create]
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
    if params['registration']
      @user = User.register(params[:user])
    else
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

    def autocomplete
    @q = params[:term]
    @users = User.named(@q)
    @users.limit(params[:limit]) if params[:limit]

    respond_with(@users) do |format|
      #format.psv { render :text => @contacts.map { |c| "#{c.last_name} #{c.first_name}|#{c.id}" }.join("\n") }
      format.json do
        if @users.any?
          render :json  =>   @users.map { |c| {:id => c.id, :label => "#{c.last_name}  #{c.first_name}", :value => c.id} }
        else
          render :json =>  [{:label => "No records founds", :value => "sds" }]
        end
      end
    end
  end

end