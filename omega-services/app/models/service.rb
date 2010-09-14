class Service < ActiveRecord::Base
    
   has_many :fields, :dependent => :destroy
   has_many :registrations, :dependent => :destroy

   
   accepts_nested_attributes_for :fields, :allow_destroy => true


end
