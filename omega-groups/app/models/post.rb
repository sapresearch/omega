class Post < Omega::Model
  belongs_to :thread
  belongs_to :author, :class_name => 'Contact'
  default_scope order('created_at asc')
end
