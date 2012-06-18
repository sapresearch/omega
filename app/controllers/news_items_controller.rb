	class NewsItemsController < Controller
	
	  require_dependency "application_lib.rb"
	  include ApplicationLib
	  
	  respond_to :html, :xml, :json, :js
	  breadcrumb 'News' => :news_items
	
	  def index
      @news_items = @old_news_items = NewsItem.all
      @news_item_sources = NewsItemSource.all
      
      #dummy data for test
      @new_news_items = (1..3).inject([]){|r, i| r << NewsItem.new(:remote_id=>i, :title=>"test news #{i}", :news_item_source=>NewsItemSource.first, :url=>"http://test#{i}", :content=>"test content#{i}")}
	  end
	  
	  def update
      @news_item = NewsItem.find(params[:id])
      @news_item.update_attributes(params[:news_item]);
    end
    
    def create
      @news_item = NewsItem.create(params[:news_item])
    end
    
    def destroy
      @news_item = NewsItem.find(params[:id])
      @news_item.destroy
    end
    
	end
