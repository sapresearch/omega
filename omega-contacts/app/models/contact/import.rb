class Contact::Import < Omega::Model

  has_attached_file :csv,
                    :url => "/csvs/contacts/:id/:basename.:extension",
                    :path => ":rails_root/public/csvs/contacts/:id/:basename.:extension"

  validates_attachment_presence :csv
  validates_attachment_content_type :csv, :content_type =>
                                                  ['text/csv',
                                                   'text/comma-separated-values',
                                                   'text/csv',
                                                   'applications/csv',
                                                   'applications/excel',
                                                   'applications/vnd.ms-excel',
                                                   'applications/vnd.msexcel',
                                                   'text/anytext',
                                                   'text/plain'
                                                  ]


end
