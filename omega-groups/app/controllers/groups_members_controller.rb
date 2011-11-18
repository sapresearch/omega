class GroupsRequestersController < Omega::Controller

  require_dependency "application_lib.rb"
  include ApplicationLib
  require_dependency "group_lib.rb"
  include GroupLib
  
  respond_to :html, :xml, :json, :js
  breadcrumb 'Groups' => :groups

  def create

  end

  def destroy
    @group_member = GroupsRequester.find(params[:id])
    @group_member.destroy
    @group = @group_request.group
    initialize_group_objects
  end

end