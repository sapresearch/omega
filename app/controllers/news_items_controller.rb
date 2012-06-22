	class NewsItemsController < Controller
	
	  require_dependency "application_lib.rb"
	  include ApplicationLib
	  require "curb"
	  
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
      url = params[:news_item][:url]   
      @news_item = NewsItem.create(params[:news_item]) unless NewsItem.find_by_url(url)
    end
    
    def destroy
      @news_item = NewsItem.find(params[:id])
      @news_item.destroy
    end
    
    #under construction
    def fetch
      uri = NewsItem::REMOTE_FETCH_NEWS_ITEMS_URL
      result = Curl::Easy.perform(uri)
      @new_news_items_hash = ActiveSupport::JSON.decode(result.body_str)
      @new_news_items = @new_news_items_hash.map{|remote_id, value_hash| NewsItem.new(:remote_id=>remote_id, :title=>value_hash["title"], :news_item_source=>NewsItemSource.find_by_url(value_hash["source_url"]), :url=>value_hash["url"], :content=>value_hash["content"])}     
    end
    
	end
