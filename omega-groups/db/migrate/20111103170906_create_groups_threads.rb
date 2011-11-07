class CreateGroupsThreads < ActiveRecord::Migration
  def self.up
    create_table :groups_threads do |t|
      t.references :group
      t.references :thread
      t.timestamps
    end
  end

  def self.down
    drop_table :groups_threads
  end
end
