class ContactsController < ApplicationController
  respond_to :html, :xml, :js, :json
  sub_layout :determine_sub_layout
  crud_helper Contact, :all => [:all]

  contact_is_self = lambda { @contact.user == current_user }
  require_permission Contact::PERM_VIEW, :except => [:show, :edit]
  require_permission Contact::PERM_VIEW, :only => [:show, :edit], :unless => contact_is_self
  require_permission Contact::PERM_VIEW_SELF, :only => [:show, :edit], :if     => contact_is_self
  require_permission Contact::PERM_ADMIN, :only => [:new, :create, :destroy]
  require_permission Contact::PERM_ADMIN, :only => [:edit, :update], :unless => contact_is_self
  require_permission Contact::PERM_EDIT_SELF, :only => [:edit, :update], :if     => contact_is_self

  breadcrumb 'Contacts' => :contacts

  def index
    @contact_groups = Contact::Group.all.group_by(&:group_type)

    respond_with(@contacts) do |format|
      format.any(:html, :js) { render 'all' }
    end
  end

  def all
    respond_with(@contacts)
  end

  def show
    respond_with(@contact)
  end

  def new
    @contact.addresses.build
    @contact.phone_numbers.build
    respond_with(@contact)
  end

  def edit
    respond_with(@contact)
  end

  def create
    respond_with(@contact = Contact.create(params[:contact]))
  end

  def autocomplete
    @q = params[:q]
    @contacts = Contact.named(@q)
    @contacts.limit(params[:limit]) if params[:limit]

    respond_with(@contacts) do |format|
      format.psv { render :text => @contacts.map { |c| "#{c.last_name} #{c.first_name}|#{c.id}" }.join("\n") }
    end
  end

  def search
    @q = params[:q]
    @contacts = Contact.named(@q)

    respond_with(@contacts) do |format|
      format.any(:html, :js) { render 'all' }
    end
  end

  def letter
    @letter = params[:letter]
    @contacts = Contact.where('last_name like ?', "#{@letter}%").order('last_name')

    respond_with(@contacts) do |format|
      format.any(:html, :js) { render 'all' }
    end
  end

  def update
    @contact.update_attributes(params[:contact])
    respond_with(@contact)
  end

  def destroy
    @contact.destroy
    respond_with(@contact)
  end


  private
  def determine_sub_layout
    case params[:action]
      when 'index'
        'contacts/with_groups'
      else
        nil
    end
  end
end