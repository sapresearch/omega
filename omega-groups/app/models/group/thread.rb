class Group::Thread < Omega::Model
  MAX_THREADS_PER_PAGE = 20
  belongs_to :group
  belongs_to :author, :class_name => '::User'

  has_many :posts

  validates_length_of :title, :maximum =>40, :message => "The title can only be 40 characters long"
  validates_presence_of :caption,:title

  accepts_nested_attributes_for :posts
end
