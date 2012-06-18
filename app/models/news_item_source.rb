	class NewsItemSource < Model
	  NAME_MAX_LENGTH = 100
	  URL_MAX_LENGTH = 150
	  SOURCE_TYPES = ['RSS']
	
	  belongs_to :account
    has_many :news_item

	  scope :named, lambda { |name| where(:name=>name) }
	  scope :named_like, lambda { |name| where('name like ? ', "%#{name}%") }
    scope :of_type, lambda{|type| where(:type=>type)}
	
	  class << self
    end
	  
	end
	
	
	
