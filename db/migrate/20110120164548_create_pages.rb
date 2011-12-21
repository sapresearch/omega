class CreatePages < ActiveRecord::Migration
  def self.up
    create_table :pages do |t|
      t.string  :path
      t.string  :name,        :null => false
      t.string  :title
      t.text    :description
      t.boolean :enabled,     :null => false, :default => true
      t.boolean :is_home,     :null => false, :default => false

      t.timestamps
    end

    add_index :pages, :path, :unique => true
    add_index :pages, :name, :unique => true
  end

  def self.down
    drop_table :pages
  end
end
