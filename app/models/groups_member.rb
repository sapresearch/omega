	class GroupsMember < Model
	  belongs_to :group
	  belongs_to :member, :class_name=>"Contact"
	
	  POSITIONS = ["leader", "member"]
	
	  def is_leader?
	    position == "leader"
	  end
	
	  def is_member?
	    position == "member"
	  end
	end
