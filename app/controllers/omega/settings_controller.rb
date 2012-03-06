module Omega
	class SettingsController < Controller
	
	
		def index
			@setting = Setting.first.nil? ? Setting.create : Setting.first
		end
	
		def new
			@fb_enabled = Setting.fb_enabled?(current_user)
			@setting = Setting.new
			@image = Image.new
			respond_to do |format|
				format.html # index.html.erb
				format.xml  { render :xml => @settings }
			end
		end
	
		def create
			@setting = Setting.new(params[:setting])
			if @setting.save
				redirect_to :action => 'index', :id => @setting.id
			else
				redirect_to :action => 'error'
			end
		end
	
		def update
			Setting.first.update_attributes(:email => params[:setting][:email])
			redirect_to(settings_url)
		end
	
	end
end
