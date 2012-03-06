module Omega
	class GroupsRequester < Model
	  belongs_to :group
	  belongs_to :requester, :class_name=>"User"
	end
end
