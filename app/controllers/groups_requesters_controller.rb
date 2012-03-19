	class GroupsRequestersController < Controller
	
	  require_dependency "application_lib.rb"
	  include ApplicationLib
	  require_dependency "group_lib.rb"
	  include GroupLib
	  
	  respond_to :html, :xml, :json, :js
	  breadcrumb 'Groups' => :groups
	
	  def index
	    @group_id = params[:group_id]
	    @group = Group.find(@group_id)
	    @groups_requesters = @group.groups_requesters
	  end
	
	  def create
	    requester_id = params[:groups_requester][:requester_id]
	    group_id = params[:groups_requester][:group_id]  
	    requester = User.find(requester_id)
	    member = requester.contact
	    @group = Group.find(group_id)    
	
	    unless @group.is_blocked?
	      @eligible = @group.eligible_for_requester?(requester)
	      if @eligible
	        @is_member =  @group.has_member?(member)
	        unless @is_member
	          group_request = GroupsRequester.find_by_group_id_and_requester_id(group_id, requester_id)
	          @group_request = GroupsRequester.create(params[:groups_requester]) if group_request.nil?
	          initialize_group_objects
	        end
	      else
	        @super_group = @group.super_group
	      end
	    end
	    respond_with('tenant', @group_request)
	  end
	
	  def update
	    GroupsRequester.transaction do
	      @groups_requester = GroupsRequester.find(params[:id])
	      if @groups_requester
	        @group = @groups_requester.group
	        @requester = @groups_requester.requester
	
	        @status=params[:groups_requester][:status]
	        @capacity_full = false
	        accept = (@status=="accepted" && @groups_requester.status!="accepted")
	        capacity_full = (@group.capacity && @group.members.count >= @group.capacity)
	
	        if accept
	          if capacity_full
	            @capacity_full = true
	          else
	            @groups_requester.destroy
	            GroupsMember.create(:group_id=>@group.id, :member_id=>@requester.contact.id, :position=>"member") unless @group.has_member?(@requester.contact)
	          end
	        else
	          @groups_requester.update_attributes(params[:groups_requester])
	        end
	
	        #for js
	        @groups_requesters = @group.groups_requesters(true) # discard cached objects
	      end
	    end
	  end
	
	  def destroy
	    @groups_requester = GroupsRequester.find(params[:id])
	    @group = @groups_requester.group
	
	    @type=params[:type]
	    if @type=="admin"
	      @groups_requester.destroy
	      @groups_requesters = @group.groups_requesters
	    else
	      @groups_requester.destroy unless @groups_requester.status == "rejected"
	      initialize_group_objects
	    end
	  end
	
	end
