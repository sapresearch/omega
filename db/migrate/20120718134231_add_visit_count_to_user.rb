class AddVisitCountToUser < ActiveRecord::Migration
  def up
    add_column :users, :visit_count, :integer, :default => 0
  end
  def down
    remove_column :users, :visit_count
  end
end
