class AddRemoteIdToNewsItemSources < ActiveRecord::Migration
  def self.up
    change_table :news_item_sources do |t|
      t.string :remote_id
    end
  end

  def self.down
    remove_column :news_item_sources, :remote_id
  end
end
