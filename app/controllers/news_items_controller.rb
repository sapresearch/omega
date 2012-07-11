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
      @new_news_items = (1..3).inject([]){|r, i| r << NewsItem.new(:remote_id=>i.to_s, :title=>"test news #{i}", :news_item_source=>NewsItemSource.first, :url=>"http://test#{i}", :content=>"test content#{i}")}
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
    
    def fetch
      url = NewsItem.remote_fetch_news_items_url(@remote_news_items_class_id, 30)
      result = Curl::Easy.perform(url)
      @new_news_items_hash = ActiveSupport::JSON.decode(result.body_str)
      @new_news_items = @new_news_items_hash.map{|remote_id, value_hash| NewsItem.new(:remote_id=>remote_id, :title=>value_hash["title"], :news_item_source=>NewsItemSource.find_by_url(value_hash["source_url"]), :url=>value_hash["url"], :content=>value_hash["content"], :liked => value_hash["in_group?"])}     
    end
    
    def like     
      @remote_id = params[:remote_id]
      url= NewsItem.remote_class_add_news_item_url(@remote_news_items_class_id, params[:remote_id])
      result = Curl::Easy.http_put(url, nil)
    end
    
    def dislike
      @remote_id = params[:remote_id]
      url= NewsItem.remote_class_remove_news_item_url(@remote_news_items_class_id, params[:remote_id])
      result = Curl::Easy.http_put(url, nil)
    end
    
    def delete_keyword
      @keyword = params[:keyword]
      @setting.delete_keyword!(@keyword)
      
      #synchronize remote service
      url = NewsItem.remote_class_remove_keyword_url(@remote_news_items_class_id, @keyword)
      result = Curl::Easy.http_put(url, nil)    
    end
    
    def create_keyword
      NewsItem.transaction do        
        @keyword = params[:keyword]
        @success = @setting.create_keyword!(@keyword)
        #synchronize remote service
        if @success
          url = NewsItem.remote_class_add_keyword_url(@remote_news_items_class_id, @keyword)
          result = Curl::Easy.http_put(url, nil)
        end
      end
    end
    
	end
