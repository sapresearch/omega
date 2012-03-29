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

    before_filter :controller_access_control

    protect_from_forgery

    layout 'application'

    breadcrumb 'Omega' => :root



    def default_url_options(options={})
      {:account_name => Account.current.name}
    end
	
    protected
      def load_hosting_account
        @account = Account.find_by_name!(params[:account_name])
		puts "\n\nFrom Controller, in load_hosting_account. Hosting Account: " + @account.inspect.to_s
		@account.with(session) { yield }
      rescue ActiveRecord::RecordNotFound
        #TODO
        render :text=>"", :status=>404
      end

      def controller_access_control
        if request.get? && session[:ajax_csrf_token].nil?
          session[:ajax_csrf_token] = Digest::MD5.hexdigest("#{Time.now.to_i}")
        elsif request.post?
          return if session[:ajax_csrf_token] != request.headers['ajax_csrf_token']
        end
        
        if current_user.is_anonymous?
          controller = params[:controller]
          free_controllers = ["home","sessions"]
          unless free_controllers.include?(controller)
            redirect_to root_url(:code=>CODE_ANONYMOUS)
            return
          end
        end
      end

  end
