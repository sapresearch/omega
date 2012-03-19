	class Contacts::InterestsController < Controller
	  respond_to :html, :xml, :json
	  #crud_helper Contact::Interest
	  require_permission Contact::PERM_VIEW
	  require_permission Contact::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]
	
	  def index
	    respond_with('tenant', @contact_interests)
	  end
	
	  def show
	    respond_with('tenant', @contact_interest)
	  end
	
	  def new
	    respond_with('tenant', @contact_interest)
	  end
	
	  def edit
	    respond_with('tenant', @contact_interest)
	  end
	
	  def create
	    respond_with('tenant', @contact_interest = Contact::Interest.create(params[:contact_interest]))
	  end
	
	  def update
	    @contact_interest.update_attributes(params[:contact_interest])
	    respond_with('tenant', @contact_interest)
	  end
	
	  def destroy
	    @contact_interest.destroy
	    respond_with('tenant', @contact_interest)
	  end
	end
