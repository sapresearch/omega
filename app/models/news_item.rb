	class NewsItem < Model
	  TITLE_MAX_LENGTH = 100
	  
	  attr_accessor :remote_id
	
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
	
	
	
