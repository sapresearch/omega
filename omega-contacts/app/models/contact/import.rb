class Contact::Import < ActiveRecord::Base
  has_attached_file :csv,
                    :url => "/csvs/contacts/:basename.:extension",
                    :path => ":rails_root/public/csvs/contacts/:basename.:extension"
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

  has_many :contacts

  accepts_nested_attributes_for :contacts


  


end