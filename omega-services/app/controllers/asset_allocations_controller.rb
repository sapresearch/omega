class AssetAllocationsController < Omega::Controller
  respond_to :html, :xml, :js, :json
  breadcrumb 'Asset Allocations' => :asset_allocations

  def index
    @assets = Asset.all(:order=>:name)
    @leaf_services = Service.service_leaves
  end

  def show_services_for_asset
    @asset_id = params[:asset_id]
    @asset = Asset.find(@asset_id)
    @leaf_services = @asset.services
  end

  def show_assets_for_service
    @leaf_service_id = params[:leaf_service_id]
    @leaf_service = Service.find(@leaf_service_id)
    @assets = @leaf_service.assets
  end
end