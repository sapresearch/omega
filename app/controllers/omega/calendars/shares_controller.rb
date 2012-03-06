module Omega
	module Calendars
	  class SharesController < Controller
	    respond_to :html, :xml, :js, :json
	    before_filter :get_scope
	
	    def create
	      @calendar = @scope.find(params[:calendar_id])
	      @share = @calendar.shares.create(params[:share])
	      flash[:notice] = "Calendar shared"
	      respond_with(@share, :location => [@calendar])
	    end
	
	    protected
	      def get_scope
	        if params[:user_id]
	          @user = User.find(params[:user_id])
	          @scope = Calendar.where(:user_id => @user)
	        else
	          @scope = Calendar.scoped
	        end
	      end
	  end
	end
end
