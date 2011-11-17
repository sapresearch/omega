class ClearGroups < ActiveRecord::Migration
  TABLES = %w{groups group_memberships group_posts group_uploads group_threads uploads}
  def self.up
    TABLES.each do |table|
      drop_table table if table_exists?(table)
    end
  end

  def self.down
    TABLES.each do |table|
      create_table table unless table_exists?(table)
    end
  end
end
