module Omega
	class Post < Omega::Model
	  has_one :topic, :dependent=>:destroy 
	  has_many :sub_posts, :class_name=>"Post", :foreign_key => "super_post_id", :dependent=>:destroy
	  belongs_to :super_post, :class_name=>"Post"
	  belongs_to :author, :class_name => 'User'
	
	  accepts_nested_attributes_for :topic
	  default_scope order('created_at asc')
	
	  TITLE_MAX_LENGTH = 100
	
	  def descendants   
	    return [] if sub_posts.empty?
	    posts = sub_posts
	    sub_posts.each{|sp|posts.concat(sp.descendants)}
	    posts
	  end
	
	  def last_post
	    return self if sub_posts.empty?
	    return sub_posts.map{|sp|sp.last_post}.max{|post1,post2|post1.updated_at<=>post2.updated_at}
	  end
	
	  def has_author?(user)
	    author == user
	  end
	
	  def root_topic
	    super_post ? super_post.root_topic : topic
	  end
	
	  def is_root?
	    super_post.nil?
	  end
	end
end
