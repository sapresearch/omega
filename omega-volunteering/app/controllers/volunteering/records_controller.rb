class Volunteering::RecordsController < ApplicationController
  respond_to :html, :xml, :json, :js

  require_permission Volunteering::PERM_VIEW
  require_permission Volunteering::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]


  def index
      @records = Volunteering::Record.all
      respond_with(@records)
    end

    def show
      @record = Volunteering::Record.find(params[:id])
      @position = Volunteering::Position.find_by_id(@record.position_id)
      respond_with(@record)
    end

    def new
      @record = Volunteering::Record.new
      @record.position = Volunteering::Position.find(params[:id])
      @record.build_contact
      @record.contact = Contact.for(current_user)

      respond_with(@record)
      
    end

    def edit
      @record = Volunteering::Record.find(params[:id])
      respond_with(@record)
    end

    def create
      @record = Volunteering::Record.create(params[:volunteering_record])
      respond_with(@record)
    end

    def update
      @record.update_attributes(params[:volunteering_record])
      respond_with(@record)
    end

    def destroy
      @record = Volunteering::Record.find(params[:id])
      @record.destroy
           
    end
  end
