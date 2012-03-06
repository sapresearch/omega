module Omega
	class Contacts::SkillsController < Controller
	  respond_to :html, :xml, :json
	  #crud_helper Contact::Skill
	#  require_permission Contact::PERM_VIEW
	#  require_permission Contact::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]
	
	  def index
	    if q = params[:q]
	      @contact_skills = Contact::Skill.where('name like ?', "%#{q}%")
	    end
	    respond_with(@contact_skills)
	  end
	
	  def suggest
	    @contact_skills = Contact::Skill.scoped
	
	    if q = params[:q]
	      @contact_skills = @contact_skills.where('name like ?', "%#{q}%")
	    end
	
	    respond_with(@contact_skills) do |format|
	      format.json do
	        begin
	          old_irij, Contact::Skill.include_root_in_json = Contact::Skill.include_root_in_json, false
	          render :json => @contact_skills.to_json(:only => :name)
	        ensure
	          Contact::Skill.include_root_in_json = old_irij
	        end
	      end
	    end
	  end
	
	  def show
	    respond_with(@contact_skill)
	  end
	
	  def new
	    respond_with(@contact_skill)
	  end
	
	  def edit
	    respond_with(@contact_skill)
	  end
	
	  def create
	    respond_with(@contact_skill = Contact::Skill.create(params[:contact_skill]))
	  end
	
	  def update
	    @contact_skill.update_attributes(params[:contact_skill])
	    respond_with(@contact_skill)
	  end
	
	  def destroy
	    @contact_skill.destroy
	    respond_with(@contact_skill)
	  end
	end
end
