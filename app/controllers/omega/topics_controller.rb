module Omega
	class TopicsController < Omega::Controller
	
	  require_dependency "application_lib.rb"
	  include ApplicationLib
	  
	  respond_to :html, :xml, :json, :js
	
	  def show
	    @group = Group.find(params[:group_id])
	    @topic = Topic.find(params[:id])
	  end
	
	  def destroy
	    @group = Group.find(params[:group_id])
	    @topic = Topic.find(params[:id])
	    @topic.post.destroy
	    
	    render :js => "window.location = '#{space_group_url(@group)}'"
	    return
	  end
	
	end
end
