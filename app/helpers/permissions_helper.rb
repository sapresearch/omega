	module PermissionsHelper
	  def with_permission(permission, &block)
	    if current_user.has_permission?(permission)
	      capture(&block)
	    end
	  end
	end
