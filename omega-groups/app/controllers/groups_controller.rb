class GroupsController < ApplicationController

  def index
    
  end
  
    def autocomplete
    @q = params[:term]
    @groups = Contact::Group.named(@q)
    @groups.limit(params[:limit]) if params[:limit]

    respond_with(@groups) do |format|
      #format.psv { render :text => @contacts.map { |c| "#{c.last_name} #{c.first_name}|#{c.id}" }.join("\n") }
      format.json do
        if @groups.any?
          render :json  =>   @groups.map { |c| {:id => c.id, :label => "#{c.name}", :value => c.id} }
        else
          render :json =>  [{:label => "No records founds", :value => "sds"}]
        end
      end
    end
  end
end