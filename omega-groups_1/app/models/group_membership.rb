class GroupMembership < Omega::Model
  belongs_to :group
  belongs_to :user
end
