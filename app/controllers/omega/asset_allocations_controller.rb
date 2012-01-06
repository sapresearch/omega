module Omega
	class AssetAllocationsController < Omega::Controller
	  require "util.rb"
	
	  respond_to :html, :xml, :js, :json
	  breadcrumb 'Asset Allocations' => :asset_allocations
	
	  def index
	    @asset_id = params[:asset_id]
	    @leaf_service_id = params[:leaf_service_id]
	
	    if @asset_id
	      asset = Asset.find(@asset_id)
	      @back_name = asset.name
	      @back_url = assets_url(:asset_id=>@asset_id)
	    elsif @leaf_service_id
	      leaf_service = Service.find(@leaf_service_id)
	      @back_name = leaf_service.name
	      @back_url = services_url(:service_id=>@leaf_service_id)
	    end
	    
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
	    @assets = @leaf_services.inject([]){|r,ls|ls.assets.reject{|asset|asset==@asset}.each{|asset| r<<asset unless r.include?(asset)}; r} <<@asset
	    @leaf_service_conflicts = Service.time_conflicting_services_with_periods(@assets)
	    @new_conflicting_leaf_services = @leaf_services.reject{|ls|ls==@leaf_service}.select{|ls| not @leaf_service_conflicts[[@leaf_service, ls].to_set].nil?}
	    
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
	    @assets = @leaf_services.inject([]){|r,ls|ls.assets.reject{|asset|asset==@asset}.each{|asset| r<<asset unless r.include?(asset)}; r} <<@asset
	    @leaf_service_conflicts = Service.time_conflicting_services_with_periods(@assets)
	
	    respond_with(@asset_allocation)
	  end
	  
	end
end
