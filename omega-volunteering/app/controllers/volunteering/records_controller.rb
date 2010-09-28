class Volunteering::RecordsController < ApplicationController
  respond_to :html, :xml, :json, :js

  require_permission Volunteering::PERM_VIEW
  require_permission Volunteering::PERM_ADMIN

   def index
      @records = Volunteering::Record.all
      respond_with(@records)
    end

    def show
      @record = Volunteering::Record.find(params[:id])
      respond_with(@record)
    end

    def new_all
      @records = Volunteering::Record.find(:all, :conditions => ['status = ?', "Applied"])
      respond_with(@records)
    end

    def pending_all
      @records = Volunteering::Record.find(:all, :conditions => ['status = ?', "Pending"])
      respond_with(@records)
    end

    def complete_all
      @records = Volunteering::Record.find(:all, :conditions => ['status = ?', "Complete"])
      respond_with(@records)
    end

    def admin_action
      @record = Volunteering::Record.find(params[:id])
      respond_with(@record)
    end

    def admin_page

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
      @record = Volunteering::Record.find(params[:id])

      case params[:volunteering_record][:action]
        when 'More Information'
          params[:volunteering_record][:status] = 'Pending'
        when 'Reject'
          params[:volunteering_record][:status] = 'Complete'
        when 'Accept'
          params[:volunteering_record][:status] = 'Complete'
      end
      
      @record.update_attributes(params[:volunteering_record])
      respond_with(@record)
    end

    def destroy
      @record = Volunteering::Record.find(params[:id])
      @record.destroy
    end
  end
