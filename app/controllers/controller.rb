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

		# This intercepts the "tenant_...._url" methods that are called in redirect to.
		# We can't just overwrite the _url method becuase the redirect_to method would
		# call the original method defined in Rails, not our monkeypatched method.
#		def method_missing(name, *args)
#			name = name.to_s
#			if name.include?("tenant_")
#				if args.empty?
#					send(name.to_s.gsub('tenant_', '').to_sym)
#				elsif !args.empty?
#					send(name.to_s.gsub('tenant_', '').to_sym, params[:account_name], args)
#				end
#			else
#				super
#			end
#		end

	def default_url_options(options={})
		{:account_name => Account.current.name}
	end
	
    protected
      def load_hosting_account
        @hosting_account = Account.find_by_name!(params[:account_name])
				puts "\n\nFrom Controller, in load_hosting_account. Hosting Account: " + @hosting_account.inspect.to_s
        @hosting_account.with { yield }
      rescue ActiveRecord::RecordNotFound
        #TODO
        render text: "", status: 404
      end
  end
