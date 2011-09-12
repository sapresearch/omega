class RolesController < Omega::Controller
  respond_to :html, :xml, :js, :json
  breadcrumb 'Roles' => :roles
  
  def index
    @roles = Role.all
    @permissions = Permission.all
  end

  def new
    
  end
 
end

