class AssetsController < Omega::Controller
  respond_to :html, :xml, :js, :json
  breadcrumb 'Assets' => :assets

  def index
    
  end
end

