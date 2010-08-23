class Contacts::SkillsController < ApplicationController
  respond_to :html, :xml, :json
  crud_helper Contact::Skill
  require_permission Contact::PERM_VIEW
  require_permission Contact::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]

  def index
    if q = params[:q]
      @contact_skills = Contact::Skill.where('name like ?', "%#{q}%")
    end
    respond_with(@contact_skills)
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