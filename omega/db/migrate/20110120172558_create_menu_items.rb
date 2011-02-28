class CreateMenuItems < ActiveRecord::Migration
  def self.up
    create_table :menu_items do |t|
      t.references :parent,      :null => false, :polymorphic => true
      t.string     :path
      t.string     :name,        :null => false
      t.string     :title
      t.string     :description
      t.boolean    :enabled,     :null => false, :default => true
      t.integer    :weight,      :null => false, :default => 10

      t.timestamps
    end

    add_index :menu_items, [:parent_id, :parent_type]
    add_index :menu_items, :path, :unique => true
    add_index :menu_items, :name, :unique => true
  end

  def self.down
    drop_table :menu_items
  end
end
