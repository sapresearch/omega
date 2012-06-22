class AddRemoteIdToNewsItems < ActiveRecord::Migration
  def self.up
    change_table :news_items do |t|
      t.string :remote_id
    end
  end

  def self.down
    remove_column :news_items, :remote_id
  end
end
