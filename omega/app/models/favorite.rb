class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :item, :polymorphic => true

  scope :of, lambda { |user| where('user_id = ?', user) }
  scope :klassed, lambda { |klass| where('item_type = ?', klass)}
  scope :for, lambda { |model| where('item_id = ?', model).klassed(model.class) }

  validates :item_id, :uniqueness => { :scope => [:user_id, :item_id, :item_type] }
end
