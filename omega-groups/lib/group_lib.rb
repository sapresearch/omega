module GroupLib

  def groups_to_search
    groups = has_permission?(Group::PERM_ADMIN) ? Group.all : Group.real_public_groups
    groups.sort!{|g1,g2|g1.name<=>g2.name}
    groups.map{|g|{:label=>g.name, :value=>g.name, :id=>g.id}}
  end

  def super_group
    (session[:super_group_id] && session[:super_group_id]!=Group::ROOT_SUPER_GROUP_ID ) ? Group.find(session[:super_group_id]) : nil
  end

  def sub_groups_of(super_group)
    super_group ? super_group.sub_groups : Group.root_groups
  end

  def new_sub_group_of(super_group)
    super_group ? super_group.sub_groups.build : Group.new({:super_group_id=>nil})
  end

  def initialize_group_objects
    @super_group = super_group
    @groups = sub_groups_of(@super_group)
    @new_group = Group.new(:super_group_id=>(@super_group ? @super_group.id : nil), :name=>"New Group")
    @new_group_request = GroupsRequester.new(:status=>:pending)
  end
  
end