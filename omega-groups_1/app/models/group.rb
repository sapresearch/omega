class Group < Omega::Model
  require_dependency 'group/thread'

  PERM_ADMIN = 'groups_admin'
  PERM_VIEW  = 'groups_view'

  MAX_GROUPS_PER_PAGE = 20
  
  class << self
    def for(user)

    end
  end

  has_many :group_memberships
  has_many :users, :through => :group_memberships
  scope :named, lambda { |name| where('name like ? ', "%#{name}%") }

  has_many :threads
  has_many :posts, :through => :threads

  has_many :group_uploads, :class_name => '::GroupUpload'
#  has_many :uploads, :through => :group_uploads, :source => :upload

  accepts_nested_attributes_for :group_uploads
end