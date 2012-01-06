module Omega
	class GroupsUpload < Omega::Model
	  belongs_to :group
	  belongs_to :upload
	end
end
