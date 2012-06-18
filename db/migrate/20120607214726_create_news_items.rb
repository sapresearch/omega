class CreateNewsItems < ActiveRecord::Migration
  def self.up
    create_table :news_items do |t|

      t.references :account, :null=>false
      t.references :news_item_source
      t.string :title
      t.text :content
      t.string :url
      t.boolean :visibility, :default=>true

      t.timestamps
    end
  end

  def self.down
    drop_table :news_items
  end
end

