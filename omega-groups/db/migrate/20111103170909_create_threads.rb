class CreateThreads < ActiveRecord::Migration
  def self.up
    create_table :threads do |t|
      t.string :caption
      t.string :title
      t.text :content
      
      t.references :author
      t.timestamps
    end
  end

  def self.down
    drop_table :threads
  end
end
