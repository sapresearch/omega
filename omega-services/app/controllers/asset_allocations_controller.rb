class AssetAllocationsController < Omega::Controller
  respond_to :html, :xml, :js, :json
  breadcrumb 'Asset Allocations' => :asset_allocations

  def index
    @assets = Asset.all(:order=>:name)
    @leaf_services = Service.service_leaves
  end

  def create
    @asset_id = params[:asset_id]
    @leaf_service_id = params[:leaf_service_id]
    @asset = Asset.find(@asset_id)
    @leaf_service = Service.find(@leaf_service_id)
    @service_leaf = @leaf_service.service_leaf
    if @asset && @service_leaf
      if AssetAllocation.find_by_asset_id_and_service_leaf_id(@asset.id, @service_leaf.id).nil?
        @asset_allocation = AssetAllocation.create(:asset_id=>@asset.id, :service_leaf_id=>@leaf_service.service_leaf.id)
      end
    end  
    
    respond_with(@asset_allocation)
  end

  def destroy
    @asset_id = params[:asset_id]
    @leaf_service_id = params[:leaf_service_id]
    @leaf_service = Service.find(@leaf_service_id)
    @service_leaf = @leaf_service.service_leaf
    if @asset_allocation = AssetAllocation.find_by_asset_id_and_service_leaf_id(@asset.id, @service_leaf.id)
      @asset_allocation.destroy
    end

    respond_with(@asset_allocation)
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