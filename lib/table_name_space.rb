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
		include ActiveRecord::ModelSchema::ClassMethods

		alias :old_table_name :table_name 
		def table_name
			table_name = self.old_table_name
			table_name.gsub('omega_', '') unless table_name.nil?
		end

	end

end
