class Calendar < Omega::Model
  PERM_ADMIN     = 'calendars_admin'
  PERM_ADMIN_OWN = 'calendars_admin_own'
  PERM_VIEW      = 'calendars_view'

  has_many :events, :dependent => :destroy

end
