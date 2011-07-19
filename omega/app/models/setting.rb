class Setting < ActiveRecord::Base
	belongs_to :user
	attr_accessor :facebook_token, :twitter
	
end
