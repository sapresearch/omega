# This is to provide an empty helper module for the Controller class.
# Rails tries to create a new module when a class is inherited.
# If this isn't here, it can't create that module, and rails blows up.
# We only get this problem with Jruby.
module Omega
	module Helper
	end
end
