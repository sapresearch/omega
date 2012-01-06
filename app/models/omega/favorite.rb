module Omega
	class Favorite < Omega::Model
	  belongs_to :user
	  belongs_to :item, :polymorphic => true
	
	  scope :of, lambda { |user| where('user_id = ?', user) }
	  scope :klassed, lambda { |klass| where('item_type = ?', klass.to_s) }
	  scope :for, lambda { |model| where('item_id = ?', model).klassed(model.class) }
	
	  validates :item_id, :uniqueness => { :scope => [:user_id, :item_id, :item_type] }
	
	  def item_text
	    item.respond_to?(:favorite_text) ? item.favorite_text : item.to_s
	  end
	end
end
