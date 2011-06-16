class Service < ActiveRecord::Base
  # app-spec
  PERM_ADMIN       = 'service_admin'
  PERM_APPLY       = 'service_apply'
  PERM_EDIT_ADMIN  = 'service_edit_admin'
  PERM_EDIT_USER   = 'service_edit_user'
  PERM_VIEW        = 'service_view'
  # end app-spec

  belongs_to :super_service, :class_name => "Service"
  has_many :sub_services, :class_name => "Service", :foreign_key => "super_service_id", :dependent => :destroy

  def is_top_level?
    super_service.nil?
  end
  
end
