class Contacts::GroupsController < ApplicationController
  respond_to :html, :xml, :js, :json
  sub_layout :determine_sub_layout
  crud_helper Contact::Group, :find => [:assign, :remove]
  require_permission Contact::PERM_VIEW
  require_permission Contact::PERM_ADMIN, :only => [:new, :edit, :create, :update, :destroy]

  def index
    respond_with(@contact_groups)
  end

  def show
    @contact_groups = Contact::Group.all.group_by(&:group_type)

    respond_with(@contact_group)
  end

  def new
    @contact_group.addresses.build
    @contact_group.phone_numbers.build
    respond_with(@contact_group)
  end

  def edit
    respond_with(@contact_group)
  end

  def create
    respond_with(@contact_group = Contact::Group.create(params[:contact_group]))
  end

  def update
    @contact_group.update_attributes(params[:contact_group])
    respond_with(@contact_group)
  end

  def destroy
    @contact_group.destroy
    respond_with(@contact_group)
  end

  def assign
    @contact = Contact.find(params[:contact_id])

    @group_position = @contact.group_positions.create do |gp|
      gp.group = @contact_group
      gp.position = params.delete(:position)
    end
    respond_with(@group_position)
  end

  def remove
    @contact = Contact.find(params[:contact_id])

    @group_positions = @contact.group_positions.where('group_id = ?', @contact_group).destroy_all
    respond_with(@group_positions)
  end

  private
    def determine_sub_layout
      case params[:action]
        when 'show'
          'contacts/with_groups'
        else
          nil
      end
    end
end