module Volunteering
  extend ActiveSupport::Autoload
  
  autoload :Position
  autoload :Record
  autoload :TimeEntry
  
  PERM_ADMIN            = 'users_admin'
  PERM_APPLY            = 'users_view'
  PERM_RECORD_HOURS     = 'users_view'
  PERM_RECORD_OWN_HOURS = 'users_view'
  PERM_VIEW             = 'users_view'
  
  def self.table_name_prefix() 'volunteering_' end
end
