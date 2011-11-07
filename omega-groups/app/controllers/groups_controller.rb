class GroupsController < Omega::Controller

  respond_to :html, :xml, :json, :js
  breadcrumb 'Groups' => :groups

  def index
    @groups = @groups.paginate(:page => params[:page], :per_page => Group::MAX_GROUPS_PER_PAGE)
    respond_with(@groups)
  end
end