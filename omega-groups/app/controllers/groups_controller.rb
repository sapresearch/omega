class GroupsController < Omega::Controller

  respond_to :html, :xml, :json, :js
  crud_helper Group

  breadcrumb 'Groups' => :groups

  def index
    @groups = @groups.paginate(:page => params[:page], :per_page => Group::MAX_GROUPS_PER_PAGE)
    respond_with(@groups)
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.create(params[:group])
    respond_with(@group)
  end

  def show
    @group = Group.find(params[:id])
    @users = @group.users
    breadcrumb @group.name => group_path(@group)
    respond_with(@group)
  end

  def destroy
    @group.destroy
    respond_with(@group)
  end

  def assign
    @group = Group.find(params[:id])
    @assigned_users = @group.users
    @users = User.all
     breadcrumb @group.name => group_path(@group)
    respond_with(@group)
  end

  def assign_user_to
    @group = Group.find(params[:id])
    @user = User.find(params[:user_id])

    @group.users << @user
    @group.save

    respond_with(@group)
  end
  
  def remove_user_from
    @group = Group.find(params[:id])
    @user = User.find(params[:user_id])

    @group_memberships = GroupMembership.where('group_id = ?', @group).where('user_id = ?', @user).destroy_all
    respond_with(@group)
  end



  def autocomplete
    @q = params[:term]
    @groups = Group.named(@q)
    @groups.limit(params[:limit]) if params[:limit]

    respond_with(@groups) do |format|
      #format.psv { render :text => @contacts.map { |c| "#{c.last_name} #{c.first_name}|#{c.id}" }.join("\n") }
      format.json do
        if @groups.any?
          render :json  =>   @groups.map { |c| {:id => c.id, :label => "#{c.name}", :value => c.id} }
        else
          render :json =>  [{:label => "No records founds", :value => "sds"}]
        end
      end
    end
  end

  def letter
    @letter = params[:letter]
    @groups = Group.where('name like ?', "#{@letter}%").order('name')
    @groups = @groups.paginate(:page => params[:page], :per_page => Group::MAX_GROUPS_PER_PAGE)
    respond_with(@groups) do |format|
      format.any(:html, :js) { render 'index' }
    end
  end

  def share
    
  end
end