module Omega
	class AssetsController < Omega::Controller
	
	  respond_to :html, :xml, :js, :json
	  breadcrumb 'Assets' => :assets
	    
	  def index
	    @asset_id = params[:asset_id]
	    @asset = Asset.find_by_id(@asset_id) unless @asset_id.nil?   # use find_by_id to return nil in case no record
	
	    # redirect to default index when the target asset is missing
	    if @asset_id && @asset.nil?
	      redirect_to assets_url
	      return
	    end
	    
	    @assets = Asset.all
	    @new_asset = Asset.new(:name=>"New Asset")
	    respond_with(@assets)
	  end
	
	  def create
	    @asset = Asset.create(params[:asset])
	
	    respond_with(@asset) do |format|
	      format.js {redirect_to assets_url(:asset_id=>@asset.id)}
	    end
	  end
	
	  def update
	    @asset = Asset.find(params[:id])
	    @asset.update_attributes(params[:asset])
	
	    respond_with(@asset) do |format|
	      format.js {redirect_to assets_url(:asset_id=>@asset.id)}
	    end
	  end
	
	  def destroy
	    @asset = Asset.find(params[:id])
	    @asset.destroy
	    @assets = Asset.all   
	  end
	
	end
end
