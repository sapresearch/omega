# This removes the omega_ prefix from the table name.
# Rather than defining the #table_name variable in each class, we put it in a module here,
# and then include it in the Omega::Model class, which every other model inherits from.
# Use #gsub instead of #demodulize, because #demodulize will also remove other modules
# from the name as well, such as volunteering.

module TableNameSpace

	def self.included(base)
		base.extend(ClassMethods)
	end

	module ClassMethods
		def table_name
			self.name.gsub('Omega::', '').underscore.gsub('/', '_').pluralize
		end
	end

end
