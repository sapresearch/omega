  class Controller < ApplicationController

		around_filter :load_hosting_account
 #    include Omega::Errors::Handler
    include Omega::Assets::Dependencies

    include Omega::Breadcrumbs
    include Omega::CurrentUser
    include Omega::CurrentUserTimeZone
#    include Omega::Crud
    include Omega::Permissions
    include Omega::SubLayouts

    include Omega::Mixins::Controllers::Crud

  #  self.responder = Omega::ControllerResponder

    before_filter :controller_access_control, :init_variables
    #around_filter :general_exception_handler

    protect_from_forgery

    layout 'application'

    breadcrumb 'Omega' => :root



    def default_url_options(options={})
      {:account_name => Account.current.name}
    end
	
    protected
      def load_hosting_account
				account_name = Rails.env.production? ? request.subdomain : params[:account_name]
				@account_path = Rails.env.production? ? "" : "/"+account_name
        @account = Account.find_by_name!(account_name)
        @account.with(session) { yield }
      	rescue ActiveRecord::RecordNotFound
        	#TODO
        	render :text=>"The #{account_name} account was not found.", :status=>404
      end

      def controller_access_control
        if request.get?
          session[:ajax_csrf_token] = Digest::MD5.hexdigest("#{Time.now.to_i}") if session[:ajax_csrf_token].nil?
        elsif request.xhr?
          if session[:ajax_csrf_token] != request.headers['ajax_csrf_token']
            render :nothing=>true
            return
          end
        end
        
        if current_user.is_anonymous?
          controller = params[:controller]
          free_controllers = ["home","sessions", "users"]
          unless free_controllers.include?(controller)
            redirect_to root_url(:code=>CODE_ANONYMOUS)
            return
          end
        end
      end
      
      def init_variables
        @setting = Setting.first
        if @setting
          @remote_news_items_class_id = @setting.news_group_id
          @keywords = @setting.news_item_keywords.to_s.split(",")
        end
        
        @customization = @setting.customization
        @logo = 'logo.png'
        @logo = @customization.logo.url(:fixed) if @customization && @customization.logo.url!="/logos/original/missing.png"
      end

      # fail gracefully
      def general_exception_handler
        begin
          yield
        rescue        
          if request.xhr?
            render :js => "dialog_message('general_message', 'Not able to process', '<p>An error has occurred. Please check your input again, or contact your administrator.</p>', {width:300})"
            return
          else            
            flash[:error]="An error has occurred. Please check your input again, or contact your administrator."
            redirect_to :back
          end          
        end
      end

  end
