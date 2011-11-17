class CreateGroupsTopics < ActiveRecord::Migration
  def self.up
    create_table :groups_topics do |t|
      t.references :group
      t.references :topic
      t.timestamps
    end
  end

  def self.down
    drop_table :groups_topics
  end
end
