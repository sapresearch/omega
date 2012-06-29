	class NewsItem < Model
	  TITLE_MAX_LENGTH = 100
	  
		setting = Setting.first
	  CLASS_ID = setting.nil? ? nil : setting.news_group_id
	  NEWS_CLASSIFIER_SERVICE_HOST = "ymqdomega2.dhcp.ymq.sap.corp:3002"
	  REMOTE_FETCH_NEWS_ITEMS_URL = NEWS_CLASSIFIER_SERVICE_HOST + "/groups/#{CLASS_ID}/stories/30"
	  
	  attr_accessor :liked
	
	  belongs_to :account
    belongs_to :news_item_source
	
	  scope :titled, lambda { |title| where(:title=>title) }
	  scope :titled_like, lambda { |title| where('title like ? ', "%#{title}%") }
	  scope :visible, lambda { where(:visibility=>true) }
	  scope :invisible, lambda { where(:visibility=>false) }
	
	  class << self
	    def remote_class_add_news_item_url(remote_id)
	      CLASS_ID
        NEWS_CLASSIFIER_SERVICE_HOST + "/groups/#{CLASS_ID}?document_id=#{remote_id}"
      end
      
      def remote_class_remove_news_item_url(remote_id)
        CLASS_ID
        NEWS_CLASSIFIER_SERVICE_HOST + "/groups/#{CLASS_ID}/remove_document/#{remote_id}"
      end
    end
    
    def visible?
      visibility
    end 
	end
	
	
	
