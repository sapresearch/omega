  class NewsItemSourcesController < Controller
  
    require_dependency "application_lib.rb"
    include ApplicationLib
    
    respond_to :html, :xml, :json, :js
  
    def create
      @news_item_source = NewsItemSource.create(params[:news_item_source])
      @news_item_sources = NewsItemSource.all
    end
    
    def update
      @news_item_source = NewsItemSource.find(params[:id])
      @news_item_source.update_attributes(params[:news_item_source]);
      @news_item_sources = NewsItemSource.all
    end
    
    def destroy
      NewsItemSource.destroy(params[:id])
      @news_item_sources = NewsItemSource.all
    end
  
  end
