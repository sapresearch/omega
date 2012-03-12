	module Volunteering
	  extend ActiveSupport::Autoload
	  
	  autoload :Position
	  autoload :Record
	  autoload :TimeEntry
	  
	  PERM_ADMIN            = 'volunteering_admin'
	  PERM_APPLY            = 'volunteering_apply'
	  PERM_ASSIGN           = 'volunteering_assign'
	  PERM_RECORD_HOURS     = 'volunteering_record_hours'
	  PERM_RECORD_OWN_HOURS = 'volunteering_record_own_hours'
	  PERM_VIEW             = 'volunteering_view'
	  
	  def self.table_name_prefix() 'volunteering_' end
	end
