  class NewsItemSourcesController < Controller
  
    require_dependency "application_lib.rb"
    include ApplicationLib
    
    respond_to :html, :xml, :json, :js
  
    def create
      NewsItemSource.transaction do
        @news_item_source = NewsItemSource.new(params[:news_item_source])
            
        #synchronize remote service
        url= NewsItemSource::REMOTE_NEWS_ITEM_SOURCES_URL
        result = Curl::Easy.http_post(url, Curl::PostField.content('group_id', NewsItem::CLASS_ID), Curl::PostField.content('url', @news_item_source.url))
        
        @remote_news_item_source_id_hash = ActiveSupport::JSON.decode(result.body_str)
        @remote_news_item_source_id = @remote_news_item_source_id_hash["$oid"]
        
        @news_item_source.remote_id = @remote_news_item_source_id
        @news_item_source.save
        @news_item_sources = NewsItemSource.all
      end 
    end
    
    def update
      NewsItemSource.transaction do
        @news_item_source = NewsItemSource.find(params[:id])
        @news_item_source.update_attributes(params[:news_item_source]);
        @news_item_sources = NewsItemSource.all
        
        #synchronize remote service
        url= @news_item_source.remote_news_item_source_url
        result = Curl::Easy.http_put(url+"?source[url]=#{@news_item_source.url.html_safe}", nil)
      end
    end
    
    def destroy
      NewsItemSource.transaction do
        @news_item_source = NewsItemSource.destroy(params[:id])
        @news_item_sources = NewsItemSource.all
        
        #synchronize remote service
        url= @news_item_source.remote_news_item_source_url
        result = Curl::Easy.http_delete(url)
      end
    end
  
  end
