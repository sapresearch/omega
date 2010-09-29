class Group < ActiveRecord::Base
  GROUP_TYPES = %w{Household Organization}

  has_many :group_positions, :dependent => :destroy
  has_many :contacts, :through => :group_positions
  
  scope :named, lambda { |name| where('name like ? ', "%#{name}%") }
end
