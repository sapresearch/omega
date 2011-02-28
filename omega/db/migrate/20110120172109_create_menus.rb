class CreateMenus < ActiveRecord::Migration
  def self.up
    create_table :menus do |t|
      t.string :name,        :null => false
      t.string :title
      t.text   :description

      t.timestamps
    end

    add_index :menus, :name, :unique => true
  end

  def self.down
    drop_table :menus
  end
end
