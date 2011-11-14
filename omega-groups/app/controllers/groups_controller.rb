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
    @super_group = super_group
    @groups = sub_groups_of(@super_group)

    respond_with(@groups)
  end

  private

  def super_group
    (session[:super_group_id] && session[:super_group_id]!=Group::ROOT_SUPER_GROUP_ID ) ? Group.find(session[:super_group_id]) : nil
  end

  def sub_groups_of(super_group)
    super_group ? super_group.sub_groups : Group.root_groups
  end

  def new_sub_group_of(super_group)
    super_group ? super_group.sub_groups.build : Group.new({:super_group_id=>nil})
  end

end