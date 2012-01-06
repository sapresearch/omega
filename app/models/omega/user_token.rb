module Omega
	require 'digest/md5'
	
	class UserToken < ActiveRecord::Base
	  TOKEN_TYPES = %w{login lost_password}
	
	  belongs_to :user
	
	  before_create :generate_token
	
	  validates :user,       :presence  => true
	  validates :token_type, :presence  => true,
	                         :inclusion => TOKEN_TYPES
	
	  private
	    def generate_token
	      self.token = Digest::MD5.hexdigest("#{user.username}-#{user.email}-#{Time.now.to_i}")
	    end
	end
end
