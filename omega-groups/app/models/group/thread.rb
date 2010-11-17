class Group::Thread < Omega::Model

  belongs_to :group
  belongs_to :author, :class_name => '::User'

  has_many :posts
end
