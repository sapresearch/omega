class SettingsController < Omega::Controller

	def index
		@settings = Setting.find_or_create_by_user_id(current_user.id)
		@image = Image.new
		respond_to do |format|
			format.html # index.html.erb
			format.xml  { render :xml => @settings }
		end
  end

  #def show
    #@setting = Setting.all #of(current_user).find(params[:id])
		#respond_to do |format|
			#format.html # index.html.erb
			#format.xml  { render :xml => @setting }
		#end
  #end

	def create
		@setting = Setting.create(params[:setting])
		if @setting.save?
			redirect_to :action => 'index', :id => @setting.id
		end
		else redirect_to :action => 'error'
	end

	def show
		@setting = Setting.find(params[:id])
	end

	def new
		@setting = Setting.new
	end

	def error
	end

end
