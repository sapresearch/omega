class Thread < Omega::Model
  belongs_to :author, :class_name => 'Contact'

  has_many :posts, :dependent=>:destroy
  has_many :groups_threads, :dependent=>:destroy
  has_many :groups, :through=>:groups_threads

  validates_length_of :title, :maximum =>40, :message => "The title can only be 40 characters long"
  validates_presence_of :caption,:title

  accepts_nested_attributes_for :posts
end
