class SettingsController < Omega::Controller

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

	def edit
		@setting = Setting.all.count <= 1 ? Setting.first : "Error: more than one setting exists"
		@setting = Setting.create if Setting.all.count == 0
		@image = Image.new
	end

	def update_email
		Setting.first.update_attributes(:email => params[:email])
		@setting = Setting.first
	end

	def update
		redirect_to(edit_settings_url)
	end

end
