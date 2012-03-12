	class Volunteering::SkillsController < Controller
	  respond_to :html, :json
	
	  def index
	    @skills = Contact::Skill.scoped
	
	    @skills = @skills.where("name LIKE ?", params[:q] + '%') if params[:q]
	
	    respond_with(@skills) do |format|
	      format.json { render :json => @skills.map { |s| { :id => s.name, :name => s.name } } }
	    end
	  end
	end
