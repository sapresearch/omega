class GroupsMembersController < Omega::Controller

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

  #developing
  def add
    group_id = params[:group_id]
    member_id = params[:member_id]    
    GroupsMember.transaction do
      begin
        @member = Contact.find(member_id)
        @group = Group.find(group_id)
        requester = @member.user
        groups_requester = GroupsRequester.find_by_group_id_and_requester_id(group_id,requester.id) if requester
        groups_requester.destroy if groups_requester # cancel pending request, if there is any
        @has_member = @group.has_member?(@member)
        unless @has_member
          GroupsMember.create(:group_id=>group_id, :member_id=>member_id, :position=>"member") unless @group.has_member?(@member)
          @group.members(:order=>:first_name).each do|member|
            if member.name>@member.name
              @before_member=member
              break;
            end
          end
        end
      rescue
        @error = true
      end
    end
  end

  #developing
  def remove
    group_id = params[:group_id]
    member_id = params[:member_id]
    GroupsMember.transaction do
      begin
        @group = Group.find(group_id)
        @member = Contact.find(member_id)
        @sub_groups=[]
        @group.sub_groups.each{ |sub_group| @sub_groups<<sub_group if sub_group.has_member?(@member)}
        if @sub_groups.empty?
          groups_member = GroupsMember.find_by_group_id_and_member_id(group_id, member_id)
          groups_member.destroy
          assigned_members = @group.members(:order=>:first_name)
          available_contacts = @group.is_root? ? Contact.all-assigned_members : @group.super_group.members-assigned_members
          available_contacts.each do|member|
            if member.name>@member.name
              @before_member=member
              break;
            end
          end
        end
      rescue
        @error = true
      end
    end
  end

end