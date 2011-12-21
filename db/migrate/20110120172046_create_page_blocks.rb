class CreatePageBlocks < ActiveRecord::Migration
  def self.up
    create_table :page_blocks do |t|
      t.references :page,     :null => false
      t.references :block,    :null => false
      t.string     :title
      t.boolean    :enabled,  :null => false, :default => true
      t.integer    :weight,   :null => false, :default => 10
      t.text       :settings

      t.timestamps
    end

    add_index :page_blocks, [:page_id, :block_id]
  end

  def self.down
    drop_table :page_blocks
  end
end
