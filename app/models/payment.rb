module Omega
	class Payment < Model 
		belongs_to :payer, :class_name=>'Contact'
		belongs_to :payable, :polymorphic => true
	end
end