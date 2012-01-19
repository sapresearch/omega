module Omega
	class Topic < Omega::Model
	  belongs_to :post, :dependent=>:destroy
	
	  has_many :groups_topics, :dependent=>:destroy
	  has_many :groups, :through=>:groups_topics
	
	  #validates_length_of :caption, :maximum =>40, :message => "The title can only be 40 characters long"
	  #validates_presence_of :caption
	
	  #accepts_nested_attributes_for :posts
	
	  TOPIC_TYPES = ["announcement", "regular"]
	
	  def is_announcement?
	    topic_type=="announcement"
	  end
	  
	  def popularity
	    post.descendants.count
	  end
	
	  def last_post
	    post.last_post
	  end
	
	  def title
	    post.title
	  end
	
	  def content
	    post.content
	  end
	
	  def author
	    post.author
	  end
	
	  def has_author?(user)
	    post.has_author?(user)
	  end
	
	end
end
