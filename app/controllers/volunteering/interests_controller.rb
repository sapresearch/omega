	class Volunteering::InterestsController < Controller
	  respond_to :html, :json
	
	  def index
	    @interests = Contact::Interest.scoped
	
	    @interests = @interests.where("name LIKE ?", params[:q] + '%') if params[:q]
	
	    respond_with(@interests) do |format|
	      format.json { render :json => @interests.map { |s| { :id => s.name, :name => s.name } } }
	    end
	  end
	end
