class AddRemoteIdToNewsItemSources < ActiveRecord::Migration
  def change
    add_column :settings, :news_item_keywords, :string
  end
end
