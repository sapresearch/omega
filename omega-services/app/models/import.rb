class Import < ActiveRecord::Base

  require 'paperclip'
  
  has_attached_file :csv
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
