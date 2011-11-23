class Group < Omega::Model
  PERM_ADMIN = 'groups_admin'
  PERM_VIEW  = 'groups_view'

  ROOT_SUPER_GROUP_ID = "root"
  NAME_MAX_LENGTH = 100

  belongs_to :super_group, :class_name => "Group"
  has_many :sub_groups, :class_name => "Group", :foreign_key => "super_group_id", :dependent => :destroy, :order => "name"
  has_many :groups_members, :dependent=>:destroy
  has_many :members, :through => :groups_members
  has_many :groups_requesters, :dependent=>:destroy
  has_many :requesters, :through => :groups_requesters
  has_many :groups_roles, :dependent=>:destroy
  has_many :roles, :through=>:groups_roles
  has_many :groups_topics, :dependent=>:destroy
  has_many :topics, :through=>:groups_topics
  has_many :groups_uploads, :dependent=>:destroy
  has_many :uploads, :through=>:groups_uploads

  scope :named, lambda { |name| where(:name=>name) }
  scope :named_like, lambda { |name| where('name like ? ', "%#{name}%") }

  class << self
    def open?
      group_roots.each{|gr|return true if gr.status=="public"}
      false
    end

    def group_roots
      Group.where(:super_group_id => nil).order(:name)
    end
    alias_method :root_groups, :group_roots

    #avoid direct iteration for performance
    def real_public_groups(group=nil)
      groups = group.nil? ? Group.root_groups : group.sub_groups
      groups = groups.select{|g| g.is_public? }
      groups_tmp = groups[0, groups.length]
      groups_tmp.each{|g| groups.concat(Group.real_public_groups(g))}
      groups
    end

    def public_groups(order_by=:name)
      Group.where(:status=>"public").order(order_by)
    end

    def private_groups(order_by=:name)
      Group.where(:status=>"private").order(order_by)
    end
  end

  def is_root?
    super_group.nil?
  end

  def is_end?
    sub_groups.empty?
  end

  def is_ancestor_of?(group)
    return false if is_end? || group.is_root?
    group.super_group == self ? true : is_ancestor_of?(group.super_group)
  end

  def is_descendant_of?(group)
    return false if is_root? || group.is_end?
    super_group == group ? true : super_group.is_descendant_of?(group)
  end

  def sibling_groups
    is_root? ? Group.root_groups : super_group.sub_groups
  end

  def super_group_id
    is_root? ? ROOT_SUPER_GROUP_ID : super_group.id
  end

  def is_real_public?
    is_root? ? status=="public" : (status=="public" && super_group.is_real_public?)
  end

  def is_public?
    status=="public"
  end

  def is_private?
    status=="private"
  end

  # should we consider publish all parent groups?
  def publish(recursive)
    transaction do
      update_attribute("status", "public")
      sub_groups.each{|g|g.publish(true)} if recursive
    end
  end

  def unpublish(recursive)
    transaction do
      update_attribute("status", "private")
      sub_groups.each{|g|g.unpublish(true)} if recursive
    end
  end

  def is_blocked?
    is_blocked
  end

  def block
    update_attribute(:is_blocked, true)
  end

  def unblock
    update_attribute(:is_blocked, false)
  end

  def eligible_for_requester?(requester)
    return true if is_root?
    super_group_member = GroupsMember.find_by_group_id_and_member_id(super_group.id, requester.contact.id)
    not super_group_member.nil?
  end

  def accepted_requesters
    groups_requesters.select{|gr|gr.status=="accepted"}.map(&:requester)
  end

  def has_leader?(member)
    groups_member = GroupsMember.find_by_group_id_and_member_id(self.id, member.id)
    groups_member && groups_member.is_leader?
  end

  def has_member?(member)
    not GroupsMember.find_by_group_id_and_member_id(self.id, member.id).nil?
  end

  def has_requester?(requester)
    not GroupsRequester.find_by_group_id_and_requester_id(self.id, requester.id).nil?
  end
end



