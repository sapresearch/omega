class Payment < ActiveRecord::Base 
  belongs_to :payer, :class_name=>'User'
  belongs_to :payable, :polymorphic => true
end

