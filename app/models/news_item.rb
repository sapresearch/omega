	class NewsItem < Model
	  TITLE_MAX_LENGTH = 100
	  
	  CLASS_ID = Setting.first.news_group_id
	  NEWS_CLASSIFIER_SERVICE_HOST = "ymqdomega2.dhcp.ymq.sap.corp:3002"
	  REMOTE_FETCH_NEWS_ITEMS_URL = NEWS_CLASSIFIER_SERVICE_HOST + "/groups/#{CLASS_ID}/stories/30"
	
	  belongs_to :account
    belongs_to :news_item_source
	
	  scope :titled, lambda { |title| where(:title=>title) }
	  scope :titled_like, lambda { |title| where('title like ? ', "%#{title}%") }
	  scope :visible, lambda { where(:visibility=>true) }
	  scope :invisible, lambda { where(:visibility=>false) }
	
	  class << self
    end
    
    def visible?
      visibility
    end
	  
	end
	
	
	
