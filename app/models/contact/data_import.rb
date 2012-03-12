module Omega
	class Contact::DataImport < Model
	
	  serialize :csv_rows
	  serialize :mapped_rows
	  serialize :imported_rows
	  serialize :contact_ids
	  serialize :mapping
	  
	end
end
