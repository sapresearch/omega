class Volunteering::RecordsController < ApplicationController
  respond_to :html, :xml, :json, :js
  breadcrumb 'Volunteering' => :volunteering
  breadcrumb 'Volunteering Applications' => :volunteering_records


  def index
    @records = Volunteering::Record.all()

    respond_with(@records)
  end

  def show
    @record = Volunteering::Record.find(params[:id])
    respond_with(@record)
  end

  def newest
    @records = Volunteering::Record.find(:all, :conditions => ['status = ?', "Applied"])
    breadcrumb 'Newest Applications' => :newest_volunteering_records
    respond_with(@records)

  end

  def pending
    @records = Volunteering::Record.find(:all, :conditions => ['status = ?', "Pending"])
    breadcrumb 'Pending Applications' => :pending_volunteering_records
    respond_with(@records)

  end

  def completed
    @records = Volunteering::Record.find(:all, :conditions => ['status = ?', "Complete"])
    breadcrumb 'Completed Applications' => :completed_volunteering_records
    respond_with(@records)

  end

  def administer
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
