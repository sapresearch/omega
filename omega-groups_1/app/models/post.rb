class Post < Omega::Model
  self.table_name = 'group_posts'
  MAX_POSTS_PER_PAGE = 10
  belongs_to :thread, :class_name => '::Group::Thread'
  belongs_to :author, :class_name => '::User'
  default_scope order('created_at asc')
end
