class GroupsController < Omega::Controller

  require_dependency "application_lib.rb"
  include ApplicationLib
  require_dependency "group_lib.rb"
  include GroupLib
  
  respond_to :html, :xml, :json, :js
  breadcrumb 'Groups' => :groups

  def index
    @group_id = params[:group_id]
    @group = Group.find_by_id(@group_id) unless @group_id.nil? # use find_by_id to return nil in case no record

    # redirect to default index when the target group is missing
    if @group_id && @group.nil?
      redirect_to groups_url
      return
    end

    session[:super_group_id] = @group.nil? ? (params[:super_group_id] || session[:super_group_id]) : @group.super_group_id
    initialize_group_objects

    respond_with(@groups)
  end

  def create
    params_group = params[:group]
    params_group.merge!({:capacity=>nil}) if params[:group][:capacity]=="unlimited"
    @creator = params[:creator_id] ? Contact.find(params[:creator_id]) : current_contact

    Group.transaction do
      @group = Group.create(params_group)
      GroupsMember.create(:group_id=>@group.id, :member_id=>@creator.id, :position=>"founder")
    end
    
    respond_with(@group) do |format|
      format.js {redirect_to groups_url(:group_id=>@group.id)}
    end
  end

  def update
    params_group = params[:group]
    params_group.merge!({:capacity=>nil}) if params[:group][:capacity]=="unlimited"
    @group = Group.find(params[:id])
    @group.update_attributes(params_group)

    respond_with(@group) do |format|
      format.js {redirect_to groups_url(:group_id=>@group.id)}
    end
  end

  def destroy
    @group = Group.destroy(params[:id])
    session[:super_group_id] = @group.super_group_id
    initialize_group_objects
  end

end