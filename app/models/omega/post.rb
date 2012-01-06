module Omega
	class Post < Omega::Model
	  has_one :topic, :dependent=>:destroy 
	  has_many :sub_posts, :class_name=>"Post", :dependent=>:destroy
	  belongs_to :super_post, :class_name=>"Post"
	  belongs_to :author, :class_name => 'User'
	  
	  default_scope order('created_at asc')
	end
end
