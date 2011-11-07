class CreateGroupPosts < ActiveRecord::Migration
  def self.up
    create_table :group_posts do |t|
      t.belongs_to :thread
      t.belongs_to :author
      t.belongs_to :post_responded_to
      t.string     :title
      t.text       :body
      t.timestamps
    end
  end

  def self.down
    drop_table :group_posts
  end
end
