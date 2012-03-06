module Omega
	class GroupsController < Controller
	
	  require_dependency "application_lib.rb"
	  include ApplicationLib
	  require_dependency "group_lib.rb"
	  include GroupLib
	  
	  respond_to :html, :xml, :json, :js
	  breadcrumb 'Groups' => :groups
	
	  def index
	    @group_id = params[:group_id]
	    @group = Group.find_by_id(@group_id) unless @group_id.nil? # use find_by_id to return nil in case no record
	
	    # redirect to default index when the target group is missing
	    if @group_id && @group.nil?
	      redirect_to groups_url
	      return
	    end
	
	    session[:super_group_id] = @group.nil? ? (params[:super_group_id] || session[:super_group_id]) : @group.super_group_id
	    initialize_group_objects
	
	    respond_with(@groups)
	  end
	
	  # app-spec for contact module
	  def show
	    group_id = params[:id]
	    @group = Group.find(group_id)
	    @members = @group.members(:order=>:first_name)    
	  end
	
	  def create
	    params_group = params[:group]
	    params_group.merge!({:capacity=>nil}) if params[:group][:capacity]=="unlimited"
	    @creator = params[:creator_id] ? Contact.find(params[:creator_id]) : current_contact
	
	    Group.transaction do
	      @group = Group.create(params_group)
	      GroupsMember.create(:group_id=>@group.id, :member_id=>@creator.id, :position=>"leader")
	    end
	    
	    respond_with(@group) do |format|
	      format.js {redirect_to groups_url(:group_id=>@group.id)}
	    end
	  end
	
	  def update
	    @group = Group.find(params[:id])
	    @type = params[:type]
	    case @type
	      when "publish"
	        @recursive = (params[:recursive]=="true"||params[:recursive]==true) ? true :false
	        @group.publish(@recursive)
	        initialize_group_objects
	      when "unpublish"
	        @recursive = (params[:recursive]=="true"||params[:recursive]==true) ? true :false
	        @group.unpublish(@recursive)
	        initialize_group_objects
	      when "block"
	        @group.block
	      when "unblock"
	        @group.unblock
	      else
	        params_group = params[:group]
	        params_group.merge!({:capacity=>nil}) if params[:group][:capacity]=="unlimited"
	        @group.update_attributes(params_group)
	
	        respond_with(@group) do |format|
	          format.js {redirect_to groups_url(:group_id=>@group.id)}
	        end
	    end
	  end
	
	  def destroy
	    @group = Group.destroy(params[:id])
	    session[:super_group_id] = @group.super_group_id
	    initialize_group_objects
	  end
	
	  def space
	    @group = Group.find(params[:id])
	    @announcements = @group.announcements
	    @regular_topics = @group.regular_topics
	    @topics = @announcements + @regular_topics
	    @new_post = Post.new(:title=>"New Post")
	    @new_post.build_topic
	  end
	
	end
end
