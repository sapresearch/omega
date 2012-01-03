class AddTopicTypeToTopics < ActiveRecord::Migration
  def self.up
    change_table :topics do |t|
      t.string :topic_type, :default => "regular"
    end
  end

  def self.down
    remove_column :topics, :topic_type
  end
end
