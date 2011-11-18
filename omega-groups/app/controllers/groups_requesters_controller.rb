class GroupsRequestersController < Omega::Controller

  require_dependency "application_lib.rb"
  include ApplicationLib
  require_dependency "group_lib.rb"
  include GroupLib
  
  respond_to :html, :xml, :json, :js
  breadcrumb 'Groups' => :groups

  def create
    requester_id = params[:groups_requester][:requester_id]
    group_id = params[:groups_requester][:group_id]  
    requester = User.find(requester_id)
    @group = Group.find(group_id)    

    unless @group.is_blocked?
      @eligible = @group.eligible_for_requester?(requester)
      if @eligible
        group_request = GroupsRequester.find_by_group_id_and_requester_id(group_id, requester_id)
        @group_request = GroupsRequester.create(params[:groups_requester]) if group_request.nil?
        @super_group = @group.super_group
        @groups = @group.sibling_groups
      else
        @super_group = @group.super_group
      end
    end
    respond_with(@group_request)
  end

end