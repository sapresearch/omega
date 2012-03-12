	class GroupsMembersController < Controller
	
	  require_dependency "application_lib.rb"
	  include ApplicationLib
	  require_dependency "group_lib.rb"
	  include GroupLib
	  
	  respond_to :html, :xml, :json, :js
	  breadcrumb 'Groups' => :groups
	
	  def index
	    @group_id = params[:group_id]
	    @group = Group.find(@group_id)
	    @groups_members = @group.groups_members
	    respond_with(@groups_members)
	  end
	
	  def update
	    GroupsMember.transaction do
	      @groups_member = GroupsMember.find(params[:id])
	      @groups_member.update_attributes(params[:groups_member]) if @groups_member
	    end
	    @group = Group.find(params[:groups_member][:group_id])
	    @groups_members = @group.groups_members
	    respond_with(@groups_member)
	  end
	
	  def destroy
	    GroupsMember.transaction do
	      @groups_member = GroupsMember.find(params[:id])
	      @group = @groups_member.group
	      @member = @groups_member.member
	      @sub_groups=[]
	      @group.sub_groups.each{ |sub_group| @sub_groups<<sub_group if sub_group.has_member?(@member)}
	      @groups_member.destroy if @sub_groups.empty?
	    end
	
	    @type=params[:type]
	    if @type=="admin"
	      @groups_members = @group.groups_members
	    else
	      initialize_group_objects
	    end
	
	  end
	
	  def add
	    @type = params[:type]
	    group_id = params[:group_id]
	    member_id = params[:member_id]    
	    GroupsMember.transaction do
	      begin
	        @member = Contact.find(member_id)        
	        @group = Group.find(group_id)
	        @contact = @member
	        @eligible = @group.eligible_for_member?(@member)
	        if @eligible
	          @group.dispose_request(@member)
	          @has_member = @group.has_member?(@member)
	          unless @has_member
	            GroupsMember.create(:group_id=>group_id, :member_id=>member_id, :position=>"member") unless @group.has_member?(@member)
	            if @type == "contacts_to_group"
	              @group.members(:order=>:first_name).each do|member|
	                if member.name>@member.name
	                  @before_member=member
	                  break;
	                end
	              end
	            elsif @type == "groups_to_contact"
	              @member.joined_groups(:order=>:name).each do |group|
	                if group.name>@group.name
	                  @before_group=group
	                  break;
	                end
	              end
	            end
	          end
	        end
	      rescue
	        @error = true
	        case @type
	        when "contacts_to_group"
	          @return_url = groups_members_url(:group_id=>@group.id)
	        when "groups_to_contact"
	          @return_url = all_contacts_url #app-spec
	        else
	        end       
	      end
	    end
	  end
	
	  def remove
	    @type = params[:type]
	    group_id = params[:group_id]
	    member_id = params[:member_id]
	    GroupsMember.transaction do
	      begin
	        @group = Group.find(group_id)
	        @member = Contact.find(member_id)
	        @contact = @member
	        @sub_groups=[]
	        @group.sub_groups.each{ |sub_group| @sub_groups<<sub_group if sub_group.has_member?(@member)}
	        if @sub_groups.empty?
	          groups_member = GroupsMember.find_by_group_id_and_member_id(group_id, member_id)
	          groups_member.destroy
	          if @type == "contacts_to_group"
	            assigned_members = @group.members(:order=>:first_name)
	            available_contacts = @group.is_root? ? Contact.all-assigned_members : @group.super_group.members-assigned_members
	            available_contacts.each do|member|
	              if member.name>@member.name
	                @before_member = member
	                break;
	              end
	            end
	          elsif @type == "groups_to_contact"
	            available_groups = Group.without_contact(@member)
	            available_groups.each do|group|
	              if group.name>@group.name
	                @before_group = group
	                break;
	              end
	            end
	          end
	        end
	      rescue
	        @error = true
	        case @type
	        when "contacts_to_group"
	          @return_url = groups_members_url(:group_id=>@group.id)
	        when "groups_to_contact"
	          @return_url = all_contacts_url # app-spec
	        else
	        end 
	      end
	    end
	  end
	
	end
