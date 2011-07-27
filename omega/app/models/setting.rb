class Setting < Omega::Model
	belongs_to :user
	attr_accessible :facebook_token, :twitter, :user_id
	
end
