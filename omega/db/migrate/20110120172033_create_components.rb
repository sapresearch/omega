class CreateComponents < ActiveRecord::Migration
  def self.up
    create_table :components do |t|
      t.string  :type,         :null => false
      t.string  :name,         :null => false
      t.string  :title
      t.text    :description
      t.text    :content,      :null => false
      t.boolean :user_created, :null => false, :default => true
      t.text    :settings

      t.timestamps
    end

    add_index :components, :name, :unique => true
  end

  def self.down
    drop_table :components
  end
end
