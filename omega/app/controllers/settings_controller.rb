class SettingsController < Omega::Controller

	def index
		@fb_enabled = Setting.fb_enabled?(current_user)
		@settings = Setting.find_by_user_id(current_user.id)
		#@settings.nil? ? @either_edit_or_new = "new" : @either_edit_or_new = "/edit"
		@either_edit_or_new = "/edit"
		if @settings.nil? then
			@settings = Setting.create(:user_id => current_user.id)
		end
			
		@image = Image.new
		respond_to do |format|
			format.html # index.html.erb
			format.xml  { render :xml => @settings }
		end
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

	def edit
		@fb_enabled = Setting.fb_enabled?(current_user)
		@setting = Setting.find(params[:id])
		@image = Image.new
		respond_to do |format|
			format.html # index.html.erb
			format.xml  { render :xml => @settings }
		end
	end

	def show
		@setting = Setting.all
		@setting = Setting.find(params[:id])
	end

	def error
	end

end
