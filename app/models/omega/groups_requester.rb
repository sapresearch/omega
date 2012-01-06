module Omega
	class GroupsRequester < Omega::Model
	  belongs_to :group
	  belongs_to :requester, :class_name=>"User"
	end
end
