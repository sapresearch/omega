class CreateGroupThreads < ActiveRecord::Migration
  def self.up
    create_table :group_threads do |t|
      t.belongs_to :group
      t.belongs_to :author
      t.string     :title
      t.text       :caption
      t.timestamps
    end
  end

  def self.down
    drop_table :group_threads
  end
end
