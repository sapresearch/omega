class Contact::DataImport < Omega::Model

  serialize :csv_rows
  serialize :mapped_rows
  serialize :imported_rows
  serialize :contact_ids
  
end