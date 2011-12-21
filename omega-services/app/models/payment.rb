class Payment < ActiveRecord::Base 
  belongs_to :payer, :class_name=>'Contact'
  belongs_to :payable, :polymorphic => true
end

