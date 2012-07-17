	class NewsItem < Model
	  TITLE_MAX_LENGTH = 100
	  NEWS_CLASSIFIER_SERVICE_HOST = "news_chimp.omegaportal.com"
	  
	  attr_accessor :liked
	
	  belongs_to :account
    belongs_to :news_item_source
	
	  scope :titled, lambda { |title| where(:title=>title) }
	  scope :titled_like, lambda { |title| where('title like ? ', "%#{title}%") }
	  scope :visible, lambda { where(:visibility=>true) }
	  scope :invisible, lambda { where(:visibility=>false) }
	
	  class << self
	    def remote_fetch_news_items_url(remote_news_items_class_id, num_news_items)
	      NEWS_CLASSIFIER_SERVICE_HOST + "/groups/#{remote_news_items_class_id}/stories/#{num_news_items}"
	    end
	    
	    def remote_class_add_news_item_url(remote_news_items_class_id, remote_id)
        NEWS_CLASSIFIER_SERVICE_HOST + "/groups/#{remote_news_items_class_id}?document_id=#{remote_id}"
      end
      
      def remote_class_add_keyword_url(remote_news_items_class_id, keyword)
        NEWS_CLASSIFIER_SERVICE_HOST + "/groups/#{remote_news_items_class_id}?keywords=#{keyword}"
      end
      
      def remote_class_remove_news_item_url(remote_news_items_class_id, remote_id)
        NEWS_CLASSIFIER_SERVICE_HOST + "/groups/#{remote_news_items_class_id}/remove_document/#{remote_id}"
      end
      
      def remote_class_remove_keyword_url(remote_news_items_class_id, keyword)
        NEWS_CLASSIFIER_SERVICE_HOST + "/groups/#{remote_news_items_class_id}/remove_keywords?keywords=#{keyword}"
      end
    end
    
    def visible?
      visibility
    end 
	end
	
	
	
