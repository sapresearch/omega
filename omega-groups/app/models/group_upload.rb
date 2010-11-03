class GroupUpload < Omega::Model
  belongs_to :group
  belongs_to :upload

#  has_upload :upload

#  has_many("uploads", :class_name => '::Upload', :as => :binding)
#  accepts_nested_attributes_for "uploads"
#  belongs_to :upload
end
