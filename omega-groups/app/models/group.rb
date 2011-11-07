class Group < Omega::Model
  PERM_ADMIN = 'groups_admin'
  PERM_VIEW  = 'groups_view'
  
  has_many :groups_members, :dependent=>:destroy
  has_many :members, :class_name=>"Contact", :through => :groups_members
  has_many :groups_roles, :dependent=>:destroy
  has_many :roles, :through=>:groups_roles
  has_many :groups_threads, :dependent=>:destroy
  has_many :threads, :through=>:groups_threads
  has_many :groups_uploads, :dependent=>:destroy
  has_many :uploads, :through=>:groups_uploads

  scope :named, lambda { |name| where(:name=>name) }
  scope :named_like, lambda { |name| where('name like ? ', "%#{name}%") }
end



