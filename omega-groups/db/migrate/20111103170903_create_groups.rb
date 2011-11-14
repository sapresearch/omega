class CreateGroups < ActiveRecord::Migration
  def self.up
    create_table :groups do |t|     
      t.string     :name
      t.text       :description
      t.string     :status,     :default=>"private"
      t.integer    :capacity
      t.boolean    :is_blocked, :default=>false

      t.references :super_group
      t.timestamps
    end
  end

  def self.down
    drop_table :groups
  end
end
