class GroupsMembersController < Omega::Controller

  require_dependency "application_lib.rb"
  include ApplicationLib
  require_dependency "group_lib.rb"
  include GroupLib
  
  respond_to :html, :xml, :json, :js
  breadcrumb 'Groups' => :groups

  def index
    @group_id = params[:group_id]
    @group = Group.find(@group_id)
    @groups_members = @group.groups_members
  end

  def create

  end

  def update
    GroupsMember.transaction do
      @groups_member = GroupsMember.find(params[:id])
      @groups_member.update_attributes(params[:groups_member]) if @groups_member
    end
    @group = Group.find(params[:groups_member][:group_id])
    @groups_members = @group.groups_members
    respond_with(@groups_member)
  end

  def destroy
    @groups_member = GroupsMember.find(params[:id])
    @group = @groups_member.group

    @type=params[:type]
    if @type=="admin"
      @groups_member.destroy
      @groups_members = @group.groups_members
    else
      @groups_member.destroy
      initialize_group_objects
    end
  end

end