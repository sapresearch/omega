class Setting < ActiveRecord::Base
	belongs_to :user
	has_one :image
	attr_accessor :facebook_token, :twitter
	
end
