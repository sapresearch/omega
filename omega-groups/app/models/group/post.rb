class Group::Post < Omega::Model
  belongs_to :thread
  belongs_to :author, :class_name => '::User'
end
