class Volunteering::PositionsController < ApplicationController
  respond_to :html, :xml, :json, :js
  crud_helper Volunteering::Position
  require_permission Volunteering::PERM_VIEW
  require_permission Volunteering::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]

  def index
    respond_with(@volunteering_positions)
  end

  def show
    respond_with(@volunteering_position)
  end

  def new
    respond_with(@volunteering_position)
  end

  def edit
    respond_with(@volunteering_position)
  end

  def create
    respond_with(@volunteering_position = Volunteering::Position.create(params[:volunteering_position]))
  end

  def update
    @volunteering_position.update_attributes(params[:volunteering_position])
    respond_with(@volunteering_position)
  end

  def destroy
    @volunteering_position.destroy
    respond_with(@volunteering_position)
  end
end
