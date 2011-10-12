class AssetAllocationsController < Omega::Controller
  require "util.rb"

  respond_to :html, :xml, :js, :json
  breadcrumb 'Asset Allocations' => :asset_allocations

  def index
    @asset_id = params[:asset_id]
    @leaf_service_id = params[:leaf_service_id]
    @assets = Asset.all(:order=>:name)
    @leaf_services = Service.service_leaves
    @leaf_service_conflicts = Service.time_conflicting_services_with_periods
  end

  def create
    @type = params[:type]
    @asset_id = params[:asset_id]
    @leaf_service_id = params[:leaf_service_id]
    @asset = Asset.find(@asset_id)
    @leaf_service = Service.find(@leaf_service_id)
    @service_leaf = @leaf_service.service_leaf
    
    if @asset && @service_leaf
      if AssetAllocation.find_by_asset_id_and_service_leaf_id(@asset_id, @service_leaf_id).nil?
        @asset_allocation = AssetAllocation.create(:asset_id=>@asset_id, :service_leaf_id=>@leaf_service.service_leaf.id)
      end
    end

    #refresh cached objects
    @leaf_services = @asset.services(true)
    @leaf_service_conflicts = Service.time_conflicting_services_with_periods(@asset)
    
    respond_with(@asset_allocation)
  end

  def destroy
    @type = params[:type]
    @asset_id = params[:asset_id]
    @leaf_service_id = params[:leaf_service_id]
    @asset = Asset.find(@asset_id)
    @leaf_service = Service.find(@leaf_service_id)
    @service_leaf = @leaf_service.service_leaf

    if @asset_allocation = AssetAllocation.find_by_asset_id_and_service_leaf_id(@asset_id, @service_leaf.id)
      @asset_allocation.destroy
    end

    #refresh cached objects
    @leaf_service = Service.find(@leaf_service_id)
    @leaf_services = @asset.services(true) << @leaf_service
    @leaf_service_conflicts = Service.time_conflicting_services_with_periods(@asset)

    respond_with(@asset_allocation)
  end
  
end