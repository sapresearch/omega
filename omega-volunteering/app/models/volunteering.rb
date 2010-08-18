module Volunteering
  extend ActiveSupport::Autoload
  
  autoload :Position
  autoload :Record
  autoload :TimeEntry
  
  PERM_ADMIN            = 'volunteering_admin'
  PERM_APPLY            = ''
  PERM_RECORD_HOURS     = ''
  PERM_RECORD_OWN_HOURS = ''
  PERM_VIEW             = 'volunteering_view'
  
  def self.table_name_prefix() 'volunteering_' end
end
