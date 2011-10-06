class CreatePageComponents < ActiveRecord::Migration
  def self.up
    create_table :page_components do |t|
      t.references :page,      :null => false
      t.references :component, :null => false
      t.string     :title
      t.boolean    :enabled,   :null => false, :default => true
      t.integer    :weight,    :null => false, :default => 10
      t.text       :settings

      t.timestamps
    end

    add_index :page_components, [:page_id, :component_id]
  end

  def self.down
    drop_table :page_components
  end
end
