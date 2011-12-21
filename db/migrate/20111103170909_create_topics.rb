class CreateTopics < ActiveRecord::Migration
  def self.up
    create_table :topics do |t|
      t.string :caption
      t.references :post
      t.timestamps
    end
  end

  def self.down
    drop_table :topics if table_exists?(:topics)
  end
end
