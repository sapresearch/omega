	class Setting < Model
		belongs_to :user
		attr_accessible :facebook_token, :twitter, :user_id, :email
		self.table_name = 'settings'
	
	  PERM_ADMIN = 'myomega_admin'
	  PERM_VIEW  = 'myomega_view'
	
		#has_many :images
		#accepts_nested_attributes_for :images
	
		def self.fb_enabled?(current_user)
			fb_enabled = FALSE
			if current_user.is_admin? then
				fb_enabled = !Setting.find_by_user_id(current_user.id).facebook_token.blank?
			else
				Setting.all.each do |setting|
					if (!setting.user.nil?) then
						if setting.user.is_admin? then
							fb_enabled = !setting.facebook_token.blank?
						end
					end
				end
			end
			return fb_enabled
		end
		
		def self.default
			first
		end
	
	end
