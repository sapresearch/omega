class CreateFavorites < ActiveRecord::Migration
  def self.up
    create_table :favorites do |t|
      t.references :user
      t.references :item, :polymorphic => true
      t.timestamps
    end
    add_index :favorites, [:user_id, :item_id, :item_type], :unique => true

  end

  def self.down
    drop_table :favorites
  end
end
