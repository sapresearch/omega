class Post < Omega::Model
  self.table_name = 'group_posts'

  belongs_to :thread, :class_name => '::Group::Thread'
  belongs_to :author, :class_name => '::User'
end
