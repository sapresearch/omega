class CreateNewsItemSources < ActiveRecord::Migration
  def self.up
    create_table :news_item_sources do |t|

      t.references :account, :null=>false
      t.string :name
      t.string :source_type, :default=>'rss'
      t.string :url

      t.timestamps
    end
  end

  def self.down
    drop_table :news_item_sources
  end
end

