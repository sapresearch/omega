class GroupsMember < Omega::Model
  belongs_to :group
  belongs_to :member, :class_name=>"Contact"
end
