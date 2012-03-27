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
        render text: "", status: 404
      end
  end
