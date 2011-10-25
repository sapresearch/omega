class AssetsController < Omega::Controller

  respond_to :html, :xml, :js, :json
  breadcrumb 'Assets' => :assets
    
  def index
   @assets = Asset.all
  end

end