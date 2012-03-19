	class Contacts::OrganizationsController < Contacts::GroupsController
	  def create
	    group = params[:contact_group]
	    group[:group_type] = 'Organization'
	
	    respond_with('tenant', @contact_group = Contact::Group.create(group))
	  end
	end
