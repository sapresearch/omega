class Topic < Omega::Model
  belongs_to :post

  has_many :groups_topics, :dependent=>:destroy
  has_many :groups, :through=>:groups_threads

  validates_length_of :title, :maximum =>40, :message => "The title can only be 40 characters long"
  validates_presence_of :caption,:title

  accepts_nested_attributes_for :posts
end
