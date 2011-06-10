class Service < ActiveRecord::Base
  # app-spec
  PERM_ADMIN       = 'service_admin'
  PERM_APPLY       = 'service_apply'
  PERM_EDIT_ADMIN  = 'service_edit_admin'
  PERM_EDIT_USER   = 'service_edit_user'
  PERM_VIEW        = 'service_view'
  # end app-spec

  belongs_to :service_type
  
end
