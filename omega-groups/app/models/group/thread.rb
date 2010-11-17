class Group::Thread < Omega::Model

  belongs_to :group
  belongs_to :author, :class_name => '::User'

  has_many :posts
  accepts_nested_attributes_for :posts
end
